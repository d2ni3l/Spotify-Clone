import React, { useEffect, useState } from "react";
import  SongBar  from "./SongBar";
import { useParams } from "react-router-dom";


const RelatedSongs = ({
  isPlaying,
  activeSong,
  handlePlayClick,
  handlePauseClick,
  artistId,
  data
}) => {


  console.log(data)

  return (
    <div className='flex flex-col'>
      <h1 className="font-bold text-3xl text-white">Related Song:</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
          key={`${song.key}-${artistId }`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
