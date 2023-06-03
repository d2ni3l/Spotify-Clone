import axios from "axios";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { TopChartCard } from "../components/TopPlay";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const handleInput = () => {
    axios
      .get("https://shazam.p.rapidapi.com/search", {
        params: {
          term: `${searchInput}`,
          limit: "5",
        },
        headers: {
          "X-RapidAPI-Key":
            "3573a95c8bmsheec14fa45a10fc1p18138bjsn66e8f46b5f4a",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      })
      .then((response) => {
        setSearchData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const artistSearchdata = searchData?.data?.artists?.hits;
  const tracksSearchdata = searchData?.data?.tracks?.hits;


const data = tracksSearchdata?.[0].track
  
    const handlePauseClick = () => {
        dispatch(playPause(false));
      };
      const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data,  i }));
        dispatch(playPause(true));
      };

  return (
    <>
      <div className='pt-5'></div>
      <div className='flex items-center gap-4'>
        <label htmlFor='voice-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'></path>
            </svg>
          </div>
          <input
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            value={searchInput}
            type='text'
            id='voice-search'
            className='   text-sm rounded-lg outline-0 border-0  input-outline block w-full pl-10 p-2.5  dark:bg-gray-900 dark:text-white placeholder:font-extrabold font-extrabold tracking-wider'
            placeholder='Search any songs or artist you want...'
            required
          />
        </div>
        <button
          onClick={handleInput}
          className='inline-flex items-center py-2 px-3 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 mr-2 -ml-1'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
          Search
        </button>
      </div>

      <SearchArtistComp artistSearchdata={artistSearchdata} />

      <div>
        {tracksSearchdata?.map((song, i) => {
          return (
            <>
              <TopChartCard
                song={song.track}
                i={i}
                key={song.track.key}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() => handlePlayClick(song.track, i)}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Search;

const SearchArtistComp = ({ artistSearchdata }) => {
  return (
    <div>
      <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Search Artist or songs</h2>
        </div>
        <div className='mt-4 flex flex-wrap'>
          {artistSearchdata?.map((song, i) => (
            <div
              key={i}
              style={{ width: "25%", height: "auto" }}
              className='shadow-lg rounded-full animate-slideright  m-5'>
              <Link to={`/artists/${song?.artist.adamid}`}>
                <img
                  src={song?.artist.avatar}
                  alt={song?.artist.name}
                  className='rounded-full object-cover w-full border  shadow-[#17072e] shadow-xl '
                />
              </Link>
              <div className='flex justify-center'>
                <p className='text-white text-xl pt-2 capitalize font-black'>
                  {song?.artist.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


