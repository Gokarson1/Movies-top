import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { genreMapping } from '../genres'; // Importar el archivo de géneros
import './Home.css'; // Importar los estilos para la página Home

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            language: 'es-ES',
          }
        });
        setMovies(response.data.results);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          query: searchQuery,
          language: 'es-ES',
        }
      });
      setMovies(response.data.results);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(selectedMovie?.id === movie.id ? null : movie);
  };

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="Home">
      <h1>Bienvenido a Movie Finder</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {isLoading && <p>Cargando...</p>}
      <div className="movie-list">
        {error && <p className="error">{error}</p>}
        {movies.length === 0 && !isLoading && <p>No se encontraron películas.</p>}
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie)}>
            {movie.poster_path && (
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            )}
            <h2>{movie.title}</h2>
            {selectedMovie?.id === movie.id && (
              <div className="movie-details">
                <p>{movie.overview}</p>
                <p><strong>Géneros:</strong> {movie.genre_ids.map(id => genreMapping[id] || 'Desconocido').join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
