import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store logged-in user
  const [movies, setMovies] = useState([]); // Store movie data
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <MovieContext.Provider value={{ user, setUser, movies, setMovies, favorites, setFavorites }}>
      {children}
    </MovieContext.Provider>
  );
};

// Add PropTypes for type checking
MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MovieProvider;