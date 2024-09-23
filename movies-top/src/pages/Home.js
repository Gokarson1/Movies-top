import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type'); // Detectar si es series o películas
  const searchQuery = queryParams.get('q'); // Detectar si hay un término de búsqueda

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Reset error on new fetch

      try {
        let endpoint = '';
        const params = {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          language: 'es-ES',
        };

        if (searchQuery) {
          // Si hay una búsqueda, usar el endpoint de búsqueda de la API
          endpoint = 'https://api.themoviedb.org/3/search/multi';
          params.query = searchQuery;
        } else if (type === 'series') {
          // Mostrar las mejores series
          endpoint = 'https://api.themoviedb.org/3/tv/top_rated'; // Mejores series
        } else if (type === 'movie') {
          // Mostrar las mejores películas
          endpoint = 'https://api.themoviedb.org/3/movie/top_rated'; // Mejores películas
        } else {
          // Mostrar las películas y series más recientes (en estreno)
          const nowPlayingMovies = 'https://api.themoviedb.org/3/movie/now_playing'; // Películas más recientes
          const onTheAirSeries = 'https://api.themoviedb.org/3/tv/on_the_air'; // Series más recientes
          
          // Hacer dos requests paralelos: uno para películas y otro para series
          const [moviesResponse, seriesResponse] = await Promise.all([
            axios.get(nowPlayingMovies, { params }),
            axios.get(onTheAirSeries, { params })
          ]);

          // Combinar películas y series
          setMovies([...moviesResponse.data.results, ...seriesResponse.data.results]);
          setIsLoading(false);
          return; // Salir ya que hemos seteado los datos
        }

        const response = await axios.get(endpoint, { params });
        setMovies(response.data.results);
      } catch (err) {
        console.error('API Error:', err.message); // Agregar log de error
        setError(err.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [type, searchQuery]);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="Home">
      {isLoading && <p>Cargando...</p>}
      <div className="movie-list">
        {error && <p className="error">{error}</p>}
        {movies.length === 0 && !isLoading && <p>No se encontraron resultados.</p>}
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            {movie.poster_path && (
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="movie-poster"
              />
            )}
            <div className="movie-title">{movie.title || movie.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
