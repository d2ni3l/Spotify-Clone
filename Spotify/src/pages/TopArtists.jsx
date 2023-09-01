import React from 'react'
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { Link } from 'react-router-dom';
const TopArtists = () => {
    const { data } = useGetTopChartsQuery();
    const topPlays = data?.tracks;
    console.log(topPlays)

  return (


    <div>
      <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Artist</h2>
        </div>
        <div
          className='mt-4 flex flex-wrap'>
          {topPlays?.map((song, i) => (
            <div
              key={song?.key}
              style={{ width: "25%", height: "auto" }}
              className='shadow-lg rounded-full animate-slideright  m-5'>
              <Link to={`/artists/${song?.artists?.[0]?.adamid}`}>
                <img
                  src={song?.images?.background}
                  alt={song?.artists}
                  className='rounded-full object-cover w-full border  shadow-[#17072e] shadow-xl '
                />
              </Link>
              <div className="flex justify-center">
              <p className='text-white text-xl pt-2 capitalize font-black'>{song?.artists?.[0]?.alias}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopArtists