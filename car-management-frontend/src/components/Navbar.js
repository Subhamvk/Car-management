import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // CSS for Navbar

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate(`/cars/search?q=${searchTerm}`); // This will navigate to the search page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">Car Management</Link>
        <Link to="/cars" className="navbar-link">Cars</Link>
      </div>
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
      <div className="navbar-right">
        <Link to="/auth" className="navbar-link">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
