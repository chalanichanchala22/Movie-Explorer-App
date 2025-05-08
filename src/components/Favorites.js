import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import { Container, Grid, Typography } from '@mui/material';

const favoritesStyles = {
  container: {
    minHeight: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")', // Movie-themed background
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
      zIndex: 1,
    },
  },
  content: {
    zIndex: 2,
    position: 'relative',
  },
  title: {
    color: '#fff', // White text for contrast against the dark overlay
    marginBottom: '20px',
  },
  message: {
    color: '#fff',
    textAlign: 'center',
  },
};

function Favorites() {
  const { favorites } = useContext(MovieContext);

  return (
    <Container sx={favoritesStyles.container}>
      <Container sx={favoritesStyles.content}>
        <Typography variant="h4" gutterBottom sx={favoritesStyles.title}>
          Favorites
        </Typography>
        {favorites.length === 0 ? (
          <Typography sx={favoritesStyles.message}>
            No favorites added yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {favorites.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Container>
  );
}

export default Favorites;