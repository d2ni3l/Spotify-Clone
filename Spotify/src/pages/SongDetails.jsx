import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useState, useEffect } from "react"

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);


 const [songData, setSongData] = useState([])

  

  useEffect(() => {
    async function getSongData () {
      const url = `https://shazam.p.rapidapi.com/songs/get-details?key=${songid}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '7b7745d456msh0b1776b0ea45935p113410jsn9105f9e36121',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };
    
    
      const response = await fetch(url, options).then(response => response.json())
  
      setSongData(response)
    
    
    }

    getSongData();
  }, [])



  

 

console.log(songData)








  return (
    <>
      <div className='flex flex-col'>
        {/* <DetailHeader artistId={artistId} songData={songData}/> */}

        <div className='mb-10 '>
            <h2 className="text-white-font-bold text-3xl">
                Lyrics:
            </h2>
            <div className="mt-5">
                {songData?.sections?.[1].type === 'LYRICS' ? songData?.sections?.[1]?.text.map((line, i) => (
                  <p className='text-gray-400 text-base my-1'>{line}</p>
                )) : <p className='text-gray-400 text-base my-1'>Lyrics not found</p>
              }
            </div>
        </div>
      </div>
    </>
  );
};

export default SongDetails;
