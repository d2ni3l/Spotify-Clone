import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useState, useEffect } from "react"

const ArtistDetails = () => {
  const [artistData, setArtistData] = useState([])

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


 console.log(artistData.data?.[0])
 console.log(artistId)




 

 


  return (
    <>
      <div className='flex flex-col'>
        <DetailsHeader artistId={artistId} artistData={artistData.data?.[0]}/> 
        <div className="pt-12"></div>

        <div>
          <a className="text-white font-semibold underline cursor-pointer" href={artistData.data?.[0]?.attributes.url}>More info</a>
        </div>


        
      </div>
    </>
  );

};

export default ArtistDetails;
