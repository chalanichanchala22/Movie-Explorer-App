import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import axios from 'axios';
import { Typography, Button, Box,Chip, Grid, Paper, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';

function MovieDetails() {
  const { id } = useParams();
  const { favorites, setFavorites } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Failed to fetch movie details. Please try again later.');
      }
    };

    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        const trailer = response.data.results.find((vid) => vid.type === 'Trailer');
        setTrailer(trailer);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchMovie();
    fetchTrailer();
  }, [id]);

  const addToFavorites = () => {
    if (!favorites.find((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
      alert(`${movie.title} added to favorites!`);
    } else {
      alert(`${movie.title} is already in your favorites.`);
    }
  };

  if (!movie) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <Typography variant="h5">Loading movie details...</Typography>
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ 
      maxWidth: "lg", 
      margin: '20px auto',
      padding: 2,
      borderRadius: 2,
      backgroundColor: '#f8f8f8'
    }}>
      <Grid container spacing={2}>
        
        {/* Movie Info */}
        <Grid item xs={12} sm={8} md={9}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' ,weight: '100%'}}>
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {movie.title}
              </Typography>
              
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <StarIcon sx={{ color: '#f5c518', mr: 1 }} />
                    <Rating 
                      value={movie.vote_average / 2} 
                      precision={0.5} 
                      readOnly 
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2">
                      ({movie.vote_average.toFixed(1)}/10)
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} alignItems="center">
                  <Box display="flex" alignItems="center">
                    <CalendarTodayIcon sx={{ fontSize: 'small', mr: 1 }} />
                    <Typography variant="body2">{movie.release_date}</Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box 
                mt={1}
                mb={1} 
                sx={{
                  backgroundColor: 'rgba(187, 129, 21, 0.1)',
                  borderRadius: 1,
                  p: 0.5,
                  display: 'inline-block'
                }}
              >
                {movie.genres.map((genre) => (
                  <Chip 
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5, backgroundColor: 'rgba(236, 196, 16, 0.8)', color: 'white' }}
                  />
                ))}
              </Box>
            </Box>
            
            <Box flex={1}>
              <Typography variant="subtitle1" gutterBottom sx={{ 
                backgroundColor: '#f5f5f5', 
                p: 0.5, 
                borderLeft: '4px solid #bb8115',
                borderRadius: '0 4px 4px 0'
              }}>
                Overview
              </Typography>
              <Typography variant="body2" paragraph sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                p: 1,
                borderRadius: 1,
                maxHeight: '150px',
                overflow: 'auto'
              }}>
                {movie.overview}
              </Typography>
              
              <Button 
                variant="contained"
                size="small" 
                startIcon={<FavoriteIcon />}
                onClick={addToFavorites} 
                sx={{ 
                  backgroundColor: '#bb8115', 
                  '&:hover': { backgroundColor: '#9e6b10' } 
                }}
              >
                Add to Favorites
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Trailer Section */}
      {trailer && (
        <Box mt={2} p={1} bgcolor="#222" borderRadius={1}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Official Trailer
          </Typography>
          <Box sx={{ position: 'relative', paddingTop: '35%', width: '100%' }}>
            <iframe
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                borderRadius: '4px' 
              }}
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default MovieDetails;