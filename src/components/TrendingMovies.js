import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import axios from 'axios';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import { Container, Grid, Button, Box, Typography, ToggleButtonGroup, ToggleButton, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const getTrendingStyles = (darkMode) => ({
  pageWrapper: {
      width: '100%',
    minHeight: '100vh', // Changed from height to minHeight
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden', // Add this to prevent scrollbar
    
  },
  container: {
    position: 'relative',
    padding: '30px', 
    width: '100%',
    margin: '0',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: darkMode ? 'rgba(218, 201, 52, 0.82)' : 'rgba(223, 178, 29, 0.7)', // Overlay based on theme
      zIndex: 1,
    },
  },
  title: {
    color: darkMode ? '#ffffff' : '#333333', // Ensuring white in dark mode
    mb: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    zIndex: 3,
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    padding: '0 20px',
  },
  button: {
    zIndex: 2,
    backgroundColor: '#bb8115',
    color: '#ffffff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#bb8115',
    },
  },
  toggleButton: {
    color: darkMode ? '#ffffff' : '#333333',
    borderColor: '#bb8115',
    '&.Mui-selected': {
      backgroundColor: '#bb8115',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#bb8115',
      },
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  themeToggle: {
    color: darkMode ? '#ffffff' : '#333333',
    border: `1px solid ${darkMode ? '#ffffff' : '#333333'}`,
    borderRadius: '50%',
    padding: '8px',
    marginLeft: '10px',
  },
 
  controlsContainer: {
    alignItems: 'center',
  }
});

function TrendingMovies() {
  const { movies, setMovies, mediaType, setMediaType, darkMode, setDarkMode } = useContext(MovieContext);
  const [page, setPage] = useState(1);
  
  // Get dynamic styles based on current theme
  const trendingStyles = getTrendingStyles(darkMode);

  const handleMediaTypeChange = (event, newValue) => {
    if (newValue !== null) {
      setMediaType(newValue);
      setPage(1); // Reset to first page when changing media type
    }
  };
  
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
        );
        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies((prev) => [...prev, ...response.data.results]);
        }
      } catch (error) {
        console.error(`Error fetching trending ${mediaType}:`, error);
        alert(`Failed to fetch trending ${mediaType === 'movie' ? 'movies' : 'TV shows'}. Please try again later.`);
      }
    };
    fetchTrending();
  }, [page, setMovies, mediaType]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Box sx={trendingStyles.pageWrapper}>
      <Box sx={trendingStyles.container}>
        <Container sx={trendingStyles.content}>
          <Box sx={trendingStyles.header}>
            <Button component={Link} to="/favorites" sx={trendingStyles.button}>
              View Favorites
            </Button>
            
            <Box sx={trendingStyles.controlsContainer}>
              <ToggleButtonGroup
                value={mediaType}
                exclusive
                onChange={handleMediaTypeChange}
                aria-label="media type"
                sx={{ backgroundColor: darkMode ? 'rgba(20, 20, 30, 0.8)' : 'rgba(255,255,255,0.2)', borderRadius: 1 }}
              >
                <ToggleButton value="movie" aria-label="movies" sx={trendingStyles.toggleButton}>
                  Movies
                </ToggleButton>
                <ToggleButton value="tv" aria-label="tv shows" sx={trendingStyles.toggleButton}>
                  TV Shows
                </ToggleButton>
              </ToggleButtonGroup>
              
              <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <IconButton onClick={toggleTheme} sx={trendingStyles.themeToggle}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          <Typography variant="h4" component="h1" sx={trendingStyles.title}>
            Trending {mediaType === 'movie' ? 'Movies' : 'TV Shows'} This Week
          </Typography>
          
          <SearchBar />
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" onClick={loadMore} sx={{ ...trendingStyles.button, margin: '20px auto', display: 'block' }}>
            Load More
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default TrendingMovies;