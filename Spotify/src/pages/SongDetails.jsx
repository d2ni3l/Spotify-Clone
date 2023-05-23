import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useState, useEffect } from "react"
const SongDetails = () => {
  const [songData, setSongData] = useState([])


  const { songid } = useParams();



  async function getSongData () {
    const url = `https://shazam.p.rapidapi.com/songs/get-details?key=${songid}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '960b526e62msh28805eb7f9c0ee3p1254b1jsna69edb120ae5',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  
  
    const response = await fetch(url, options).then(response => response.json())

    setSongData(response)
  
  
  }


  

   const handlePauseClick = () => {
    dispatch(playPause(false))
   }
   const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
   }
 
  
  useEffect(() => {
    getSongData();
   

    
  
  }, [songid])

 


  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);




 

 


  return (
    <>
      <div className='flex flex-col'>
        <DetailsHeader artistId='' songData={songData}/> 
        <div className="pt-12"></div>

        <div className='mb-10 '>
            <h2 className="text-white font-bold text-3xl">
                Lyrics:
            </h2>
            <div className="mt-5">
                {songData?.sections?.[1].type === 'LYRICS' ? songData?.sections?.[1]?.text.map((line, i) => (
                  <p key={i} className='text-gray-400 text-base my-1'>{line}</p>
                )) : <p className='text-gray-400 text-base my-1'>Lyrics not found</p>
              }
            </div>
        </div>

        
      </div>
    </>
  );

};

export default SongDetails;
