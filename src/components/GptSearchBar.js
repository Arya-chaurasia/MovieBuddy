import React, { useRef } from 'react'
import lang from '../utils/langConstant'
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/slices/gptSlice';

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store?.config?.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `/tmdb/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results, "jsonnn")

    return json.results;
  };

const handleGptSearchClick = async () => {
  if (!searchText.current.value.trim()) {
    alert("Please enter a movie query");
    return;
  }

  const prompt =
    "Act as a Movie Recommendation system and suggest some movies for the query : " +
    searchText.current.value +
    ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: saiyaara, sarzameen, Dhamal, Golmaal, Koi Mil Gaya";

  try {
    const response = await fetch("http://localhost:4000/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Backend API error");
    }

    const data = await response.json();

    if (!data.text) {
      console.error("No text from backend");
      return;
    }

    const gptMovies = data.text.split(",").map(m => m.trim());

    const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
  } catch (error) {
    console.error("Error fetching from backend:", error);
  }
};




  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey]?.gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey]?.search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar