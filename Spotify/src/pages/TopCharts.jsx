import React from 'react'
import { TopChartCard } from '../components/TopPlay'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useSelector, useDispatch} from "react-redux";

const TopCharts = () => {
    const dispatch = useDispatch();


  
    
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data } = useGetTopChartsQuery();
  const topPlays = data?.tracks;

 

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div>

{topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
    </div>
  )
}

export default TopCharts