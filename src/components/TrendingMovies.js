import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import axios from 'axios';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import { Container, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const trendingStyles = {
  container: {
    minHeight: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")', // Movie-themed background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    padding: '20px',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(187, 129, 21, 0.5)', // Dark overlay
      zIndex: 2,
    },
  },
  content: {
    zIndex: 2,
    position: 'relative',
  },
  button: {
    zIndex: 2,
    backgroundColor: '#bb8115', // Changed to match the overlay color
    color: '#ffffff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#8c6010',
    },
  },
};

function TrendingMovies() {
  const { movies, setMovies } = useContext(MovieContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
        );
        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies((prev) => [...prev, ...response.data.results]);
        }
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        alert('Failed to fetch trending movies. Please try again later.');
      }
    };
    fetchTrending();
  }, [page, setMovies]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Container sx={trendingStyles.container}>
      <Container sx={trendingStyles.content}>
        <Button component={Link} to="/favorites" sx={trendingStyles.button}>
          View Favorites
        </Button>
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
    </Container>
  );
}

export default TrendingMovies;