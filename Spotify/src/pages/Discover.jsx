import { Error, Loader, SongCard } from "../components";
import {useDispatch, useSelector} from 'react-redux'
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const Discover = () => {
  const {activeSong, isPlaying} = useSelector((state) => state.player)
  const {data, isFetching, error} = useGetTopChartsQuery();

  const title = "Pop";

  if(isFetching) return <Loader title='Loading Songs...'/>;

  if ( error || data?.tracks === null) return <></>


  
  console.log(data)
  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <h2 className='font-bold text-3xl text-white text-left'>
          Discover {title}
        </h2>
       
      </div>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.tracks?.map((song, i) => {
          return <SongCard key={song.key} isPlaying={isPlaying} data={data.tracks} activeSong={activeSong} i={i} song={song} />;
        })}
      </div>  
    </div>
  );
};

export default Discover;
