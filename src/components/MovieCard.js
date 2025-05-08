import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  
  // Handle case when movie or poster_path is undefined
  const imageSrc = movie && movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-poster.png'; // Create a placeholder image

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={imageSrc}
        alt={movie?.title || 'Movie'}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/no-poster.png'; 
        }}
      />
      <CardContent>
        <Typography variant="h6">{movie?.title || 'Unknown Title'}</Typography>
        <Typography variant="body2">Release: {movie?.release_date || 'Unknown'}</Typography>
        <Typography variant="body2">Rating: {movie?.vote_average || 'N/A'}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/movie/${movie?.id}`)}>View Details</Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;