import { useContext, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Box, TextField, Button, Grid, Typography, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const { darkMode, search, setSearch, minRating, setMinRating } = useContext(MovieContext);
  const [searchInput, setSearchInput] = useState(search);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search movies..."
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            sx={{
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? '#bb8115' : '#bb8115',
                },
              },
              '& .MuiInputBase-input': {
                color: darkMode ? '#ffffff' : '#333333',
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="legend" sx={{ color: darkMode ? '#ffffff' : '#333333', mr: 1 }}>
              Min Rating:
            </Typography>
            <Rating
              name="min-rating"
              value={minRating}
              onChange={(event, newValue) => {
                setMinRating(newValue || 0);
              }}
              precision={0.5}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#bb8115',
                },
                '& .MuiRating-iconEmpty': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button 
            variant="contained" 
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            sx={{
              backgroundColor: '#bb8115',
              color: '#ffffff',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#9e6c13',
              },
              width: { xs: '100%', md: 'auto' }
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchBar;