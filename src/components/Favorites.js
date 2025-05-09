import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import { Container, Grid, Typography, Box } from '@mui/material';

const favoritesStyles = {
  root: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'rgba(236, 196, 16, 0.8)', 
    padding: '20px',
    overflow: 'hidden',
  },
  content: {
    zIndex: 2,
    position: 'relative',
  },
  title: {
    color: '#ffffff', 
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
    <Box sx={favoritesStyles.root}>
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
    </Box>
  );
}

export default Favorites;