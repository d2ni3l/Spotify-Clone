import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7b7745d456msh0b1776b0ea45935p113410jsn9105f9e36121',
      'X-RapidAPI-Host': 'shazam-core7.p.rapidapi.com'
    }
  };
  
  fetch('https://shazam-core7.p.rapidapi.com/charts/get-top-songs-in-world', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));



export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core7.p.rapidapi.com/',
    prepareHeaders : (headers) => {
        headers.set('X-RapidAPI-Key', '7b7745d456msh0b1776b0ea45935p113410jsn9105f9e36121')

        return headers;
    }
  })
});