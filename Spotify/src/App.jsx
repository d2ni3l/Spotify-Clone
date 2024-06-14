import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  TopArtists,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const ApiShutDown = () => (
    <div className='text-red-500 absolute bg-red-100 z-[1000] w-screen h-screen flex items-center justify-center flex-col'>
      <h1 className='font-bold text-4xl'>
        Api Deprecated but you can still you the funtionality as usual
        <a
          target='_blank'
          className='underline'
          href='https://rapidapi.com/apidojo/api/shazam/playground/apiendpoint_c15fbc17-5fcb-4e6f-a785-07434c31e176'>
          Rapid Api Link
        </a>
      </h1>
      <a href='/search' className="font-bold text-3xl underline">search page</a>
    </div>
  );
  return (
    <main className='relative flex'>
      <Sidebar />

      <div className='flex-1 flex flex-col bg-gradient-to-br to-[#1e1e1e] from-[#040404]'>
        <Searchbar />

        <div className='px-6  overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
          <div className='flex-1 h-fit pb-40'>
            <Routes>
              <Route path='/' element={<ApiShutDown />} />
              <Route path='/top-artists' element={<ApiShutDown />} />
              <Route path='/top-charts' element={<ApiShutDown />} />
              <Route path='/artists/:id' element={<ArtistDetails />} />
              <Route path='/song/:songid' element={<SongDetails />} />
              <Route path='/search' element={<Search />} />
            </Routes>
          </div>
          <div className='xl:sticky relative top-0 h-fit'>
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className='fixed h-28 bottom-0  left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10'>
          <MusicPlayer />
        </div>
      )}
    </main>
  );
};

export default App;
