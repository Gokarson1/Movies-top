import React from 'react';
import './Header.css'; // Asegúrate de tener este archivo para estilos personalizados
import { Link } from 'react-router-dom'; // Para navegación futura

function Header() {
  return (
    <header className="Header">
      <div className="left-section">
        <img src="/images/abeja.png" alt="Logo" className="logo" />

        <h1 className="title">TopBeeMovies</h1>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Buscar películas o series..." 
          className="search-input"
        />
      </div>

      <div className="right-section">
        <Link to="/" className="nav-link">Películas</Link>
        <Link to="/" className="nav-link">Series</Link>
        <button className="user-btn">Usuario</button>
      </div>
    </header>
  );
}

export default Header;
