import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GPTSearch = () => {
  return (
     <>
      <div className="fixed inset-0 -z-10">
        <img className="w-full h-full object-cover" src={BG_URL} alt="logo" />
      </div>
      <div className="">
      
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  )
}

export default GPTSearch