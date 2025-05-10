import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Movie Explorer</Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/popular">Popular</Link></li>
            <li><Link to="/top-rated">Top Rated</Link></li>
            <li><Link to="/upcoming">Upcoming</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default header;