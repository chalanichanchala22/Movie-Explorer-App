import { useContext, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import axios from 'axios';
import { TextField, Button, Container, Grid } from '@mui/material';

function SearchBar() {
  const { setMovies } = useContext(MovieContext);
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  const searchMovies = async () => {
    try {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
      if (query) url += `&query=${query}`;
      if (year) url += `&primary_release_year=${year}`;
      if (rating) url += `&vote_average.gte=${rating}`;

      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      alert('Failed to fetch movies. Please try again later.');
    }
  };

  return (
    <Container maxWidth="md" style={{ margin: '20px 0' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search Movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Year (e.g., 2020)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Min Rating (e.g., 7)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={searchMovies} fullWidth>
        Search
      </Button>
    </Container>
  );
}

export default SearchBar;