import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirecciona a la URL con el parámetro de búsqueda
      navigate(`/?q=${searchQuery}`);
    }
  };

  const handleLogoClick = () => {
    // Volver al inicio, sin ningún tipo, para mostrar las películas y series más recientes
    navigate('/');
  };

  return (
    <header className="Header">
      <div className="logo-title-section">
        <img src="/images/abeja.png" alt="Logo" className="logo" onClick={handleLogoClick} />
        <h1 className="title" onClick={handleLogoClick}>TopBeeMovies</h1>
      </div>

      <div className="nav-buttons">
        <Link to="/?type=movie" className="nav-link">Películas</Link>
        <Link to="/?type=series" className="nav-link">Series</Link>
      </div>

      <button className="user-btn">Perfil</button>

      <div className="search-bar">
        <form onSubmit={handleSearch} className="input-container">
          <input
            type="text"
            placeholder="Buscar películas o series..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
