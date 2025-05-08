import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';

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

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4">{movie.title}</Typography>
      <Typography variant="body1" paragraph>
        {movie.overview}
      </Typography>
      <Typography>Genres: {movie.genres.map((g) => g.name).join(', ')}</Typography>
      <Typography>Release: {movie.release_date}</Typography>
      <Typography>Rating: {movie.vote_average}</Typography>
      {trailer && (
        <div style={{ margin: '20px 0' }}>
          <Typography variant="h6">Trailer</Typography>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <Button variant="contained" onClick={addToFavorites} style={{ marginTop: '10px' }}>
        Add to Favorites
      </Button>
    </Container>
  );
}

export default MovieDetails;