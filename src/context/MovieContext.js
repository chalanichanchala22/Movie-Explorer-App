import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const MovieContext = createContext();

// Define theme colors to use throughout the app
export const getThemeColors = (isDarkMode) => ({
  text: {
    primary: isDarkMode ? '#ffffff' : '#333333',
    secondary: isDarkMode ? '#cccccc' : '#555555',
    accent: '#bb8115', // Gold accent color that works in both modes
  },
  background: {
    primary: isDarkMode ? 'rgba(12, 12, 22, 0.8)' : 'rgba(245, 240, 230, 0.7)',
    paper: isDarkMode ? 'rgba(25, 25, 35, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    accent: isDarkMode ? '#1a1a2e' : '#f5f0e6',
  },
  button: {
    background: '#bb8115',
    text: '#ffffff',
    hover: '#cc9125',
  }
});

export const MovieProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });
  const [mediaType, setMediaType] = useState('movie');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'false' ? false : true;
  });
  
  // Create theme colors based on current darkMode state
  const themeColors = getThemeColors(darkMode);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <MovieContext.Provider value={{ 
      user, 
      setUser, 
      movies, 
      setMovies, 
      favorites, 
      setFavorites,
      mediaType,
      setMediaType,
      darkMode,
      setDarkMode,
      themeColors // Make theme colors available through context
    }}>
      {children}
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MovieProvider;