import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from './MovieCard';
import { Container, Grid, Typography, Box } from '@mui/material';

function Favorites() {
  const { favorites, darkMode} = useContext(MovieContext);

  const favoritesStyles = {
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
      minHeight: '100vh',
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
        backgroundColor: darkMode ? 'rgba(20, 20, 30, 0.9)' : 'rgba(255, 255, 255, 0.95)',
        zIndex: 1,
      },
    },
    content: {
      zIndex: 3,
      position: 'relative',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      padding: '0 20px',
    },
    title: {
      color: darkMode ? '#ffffff' : '#333333',
      marginBottom: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    message: {
      color: darkMode ? '#ffffff' : '#333333',
      textAlign: 'center',
      marginTop: '50px',
      fontSize: '1.2rem',
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
  };

  return (
    <Box sx={favoritesStyles.pageWrapper}>
      <Box sx={favoritesStyles.container}>
        <Container sx={favoritesStyles.content}>
          <Typography variant="h4" gutterBottom sx={favoritesStyles.title}>
            Favorites
          </Typography>
          {favorites.length === 0 ? (
            <Typography variant="h6" sx={favoritesStyles.message}>
              No favorites added yet. Browse movies and click the heart icon to add favorites.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {favorites.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                  <Box sx={favoritesStyles.cardWrapper}>
                    <MovieCard movie={movie} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Favorites;