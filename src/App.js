import React, { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard';
import searchIcon from './search.svg';

export default function App() {
  const apiUrl = 'https://www.omdbapi.com/?apikey=5706932f'

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Batman')
  }, [])

  return (
    <>
      <div className="app">
        <a href="/" style={{ textDecoration: 'none' }}>

          <h1>MovieLand</h1>
        </a>
        <div className="search">
          <input
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchMovies(searchTerm)
              }
            }}
          />
          <img
            src={searchIcon}
            alt="Search Logo"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {
          movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
        }
      </div>
    </>
  )
}
