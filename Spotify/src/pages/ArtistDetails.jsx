import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useState, useEffect } from "react"
import {AiFillInfoCircle} from 'react-icons/ai'
import axios from 'axios'
const ArtistDetails = () => {
  const [artistData, setArtistData] = useState([])

  const {id: artistId } = useParams();



  async function getArtistData () {
    const url = `https://shazam.p.rapidapi.com/artists/get-details?id=${artistId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3573a95c8bmsheec14fa45a10fc1p18138bjsn66e8f46b5f4a',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  
  
    const response = await fetch(url, options).then(response => response.json())

    setArtistData(response)
  
  
  }

  useEffect(() => {
    getArtistData();

    

   
  
  
  }, [artistId])

  useEffect(() => {
  
    
  }, [artistId])


console.log(artistData.data?.[0])
  



 




 

 


  return (
    <>
      <div className='flex flex-col'>
        <DetailsHeader artistId={artistId} artistData={artistData.data?.[0]}/> 
        <div className="pt-12"></div>

        <div className="flex justify-between">
          <a className="text-white font-semibold underline cursor-pointer flex items-center gap-2" href={artistData.data?.[0]?.attributes.url}><AiFillInfoCircle className="text-white" size='20'/> More info</a>
          <h2 className="text-gray-500 font-black text-xl"><span> Albums Released:</span> {artistData.data?.[0].relationships?.albums?.data.length}</h2>

        </div>

        


        
      </div>
    </>
  );

};

export default ArtistDetails;
