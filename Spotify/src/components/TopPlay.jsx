import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
const TopPlay = () => {
 

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  const dispatch = useDispatch();

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

 

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };


  const topPlays = data?.tracks?.slice(0, 5);

  
  return (
    <div
      ref={divRef}
      className='xl:ml-6 ml-0 xl:mb-0 mt-6 flex-1 xl:max-w-[490px]  max-w-full flex flex-col'>
      <div className='w-full flex flex-col '>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
          <Link to='/top-charts'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>

        <div className='mt-4 flex flex-col gap-1'>
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
      </div>
      

      <Artists topPlays={topPlays} />
      

    </div>
  );
};

const Artists =  ({topPlays}) => {

  return(

  <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Artist</h2>
          <Link to='/top-artists'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'>
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "25%", height: "auto" }}
              className='shadow-lg rounded-full animate-slideright'>
              <Link to={`/artist/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt={song?.artists}
                  className='rounded-full object-cover w-full'
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      )

}

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className='w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4  rounded-lg cursor-pointer mb-2'>
      <h3 className='font-bold text-base text-white mr-3'>{i + 1}</h3>
      <div
        className='flex-1 flex flex-row justify-between
       items-center'>
        <img
          src={song?.images?.coverart}
          alt={song?.title}
          className='w-20 h-20 rounded-lg'
        />
        <div className='flex-1 flex flex-col justify-center mx-3'>
          <Link to={`/song/${song?.key}`}>
            <p className='text-xl font-bold text-white'>{song?.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className='text-base font-bold text-gray-300 mt-1'>
              {song?.subtitle}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

export {
  TopPlay
}

export{
  Artists
}

export{
  TopChartCard
  
}


