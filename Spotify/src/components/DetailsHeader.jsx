import {Link} from 'react-router-dom';


const DetailsHeader = ({songData, artistId, artistData}) => (
  <div className='relative flex flex-col w-full'>
   <div className='w-full bg-gradient-to-l  from-transparent mt-12 rounded to-purple-500 opacity-[.3] sm:h-48 h-28'/>

   <div className="absolute inset-0 top-10 flex items-center">
    <img className='sm:w-44 w-24 sm:h-44 h-24 rounded-full object-cover border-2 shadow-xl shadow-black' src={artistId ? artistData?.attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500') : songData?.images?.coverart} 
    alt="art" />

    <div className="ml-5">
      <p className='sm:text-3xl font-bold text-xl text-white'>{artistId ? artistData?.attributes?.name: songData.title} </p>

      <p className='text-base mt-2 text-gray-400'>{!artistId && (
        <Link to={`/artist/${songData?.artists?.[0].adamid}`}>
        {songData?.subtitle}
        </Link>
      )}</p>

      <p className='text-base mt-2 text-white font-bold'>
        <span className="font-bold">{artistId ? artistData?.attributes?.genreNames[0] : songData?.genre?.primary} </span> <span className='text-gray-200'>Artist</span>
      </p>
    </div>
   </div>
  </div>
);

export default DetailsHeader;


