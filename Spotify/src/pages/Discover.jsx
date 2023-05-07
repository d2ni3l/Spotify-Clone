import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
const Discover = () => {
  const {data, isFetching, error} = useGetTopChartsQuery();

  console.log(data)
  const title = "Pop";

  if(isFetching) return <Loader title='Loading Songs...'/>;

  if ( error) return <Error/>
  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <h2 className='font-bold text-3xl text white text-left'>
          Discover {title}
        </h2>
        <select
          onChange={() => {}}
          value=''
          className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-nonesm:mt-0 mt-5 '>
          {genres.map((genres) => {
            return (
              <option key={genres.value} value={genres.value}>
                {genres.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song, i) => {
          return <SongCard key={i} i={i} song={song} />;
        })}
      </div>
    </div>
  );
};

export default Discover;
