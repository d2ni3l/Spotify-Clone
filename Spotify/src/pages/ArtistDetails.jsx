import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useState, useEffect } from "react"
import {AiFillInfoCircle} from 'react-icons/ai'
import axios from 'axios'
const ArtistDetails = () => {
  const [artistData, setArtistData] = useState([])
  const [albumData, setAlbumData] = useState([])

  const {id: artistId } = useParams();



  async function getArtistData () {
    const url = `https://shazam.p.rapidapi.com/artists/get-details?id=${artistId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '960b526e62msh28805eb7f9c0ee3p1254b1jsna69edb120ae5',
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
    const fetchData = async () => {
      try {
        await (
          artistData.data?.[0]?.relationships?.albums?.data.slice(0,3).map( (item) => {
            axios.get('https://shazam.p.rapidapi.com/albums/get-details', {
              params: {
                id: `${item.id}`,
              },
           headers: {
         'X-RapidAPI-Key': '960b526e62msh28805eb7f9c0ee3p1254b1jsna69edb120ae5',
         'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
       } 
              
            }).then(response => {setAlbumData(response.data)});
            // Handle the response data for each item
          })
        );
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    };
    console.log(albumData.data?.[0]?.attributes)
    

    fetchData();
    
  }, [artistId])


  // data

  



 




 

 


  return (
    <>
      <div className='flex flex-col'>
        <DetailsHeader artistId={artistId} artistData={artistData.data?.[0]}/> 
        <div className="pt-12"></div>

        <div>
          <a className="text-white font-semibold underline cursor-pointer flex items-center gap-2" href={artistData.data?.[0]?.attributes.url}><AiFillInfoCircle className="text-white" size='20'/> More info</a>
        </div>

        <div className="mt-12">
          <h2 className="text-white font-black text-xl">Recent Albums</h2>
          
        </div>


        
      </div>
    </>
  );

};

export default ArtistDetails;
