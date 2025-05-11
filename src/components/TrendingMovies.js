import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import axios from 'axios';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import { Container, Grid, Button, Box, Typography } from '@mui/material';

const getTrendingStyles = (darkMode) => ({
  pageWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    flex: '1 1 auto',
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
      backgroundColor: darkMode ? 'rgba(85, 84, 81, 0.82)' : 'rgb(255, 255, 255)',
      zIndex: 1,
    },
  },
  title: {
    color: darkMode ? '#ffffff' : '#333333',
    mb: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    zIndex: 3,
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    height:'100%',
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
  cardWrapper: {
    border: darkMode ? '2px solid #bb8115' : '2px solid #dca552',
    borderRadius: '8px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: darkMode ? '0 10px 20px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.15)',
    },
    height: '100%',
    display: 'flex',
  }
});

function TrendingMovies() {
  const { movies, setMovies, mediaType, darkMode } = useContext(MovieContext);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const trendingStyles = getTrendingStyles(darkMode);

  useEffect(() => {
    // Only fetch trending if not searching
    if (!isSearching) {
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
    }
  }, [page, setMovies, mediaType, isSearching]);

  const handleSearch = async (query) => {
    if (query) {
      setSearchQuery(query);
      setIsSearching(true);
      setPage(1);
      
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/${mediaType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(`Error searching ${mediaType}:`, error);
        alert(`Failed to search ${mediaType === 'movie' ? 'movies' : 'TV shows'}. Please try again later.`);
      }
    } else {
      // Reset to trending when search is cleared
      setIsSearching(false);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const loadMoreSearch = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${mediaType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchQuery}&page=${nextPage}`
      );
      setMovies((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.error(`Error searching ${mediaType}:`, error);
      alert(`Failed to load more search results. Please try again later.`);
    }
  };

  return (
    <Box sx={trendingStyles.pageWrapper}>
      <Box sx={trendingStyles.container}>
        <Container sx={trendingStyles.content}>
          <Typography variant="h4" component="h1" sx={trendingStyles.title}>
            {isSearching 
              ? `Search Results for "${searchQuery}"`
              : `Trending ${mediaType === 'movie' ? 'Movies' : 'TV Shows'} This Week`}
          </Typography>
          
          <SearchBar onSearch={handleSearch} />
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Box sx={trendingStyles.cardWrapper}>
                  <MovieCard movie={movie} />
                </Box>
              </Grid>
            ))}
          </Grid>
          {movies.length > 0 ? (
            <Button 
              variant="contained" 
              onClick={isSearching ? loadMoreSearch : loadMore} 
              sx={{ ...trendingStyles.button, margin: '20px auto', display: 'block' }}
            >
              Load More
            </Button>
          ) : (
            <Typography variant="h6" sx={{textAlign: 'center', my: 4}}>
              No results found. Try a different search.
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default TrendingMovies;