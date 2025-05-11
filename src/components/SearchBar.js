import { useContext, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Box, TextField, Button, Grid, Typography, Rating, Select, MenuItem, FormControl, InputLabel, Slider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

function SearchBar({ onSearch }) {
  const { darkMode } = useContext(MovieContext);
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState([1900, 2025]);
  const [ratingFilter, setRatingFilter] = useState(0);

  // List of common movie genres
  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
  ];

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        query: searchInput,
        genre: genreFilter,
        year: yearFilter,
        rating: ratingFilter
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchInput('');
    setGenreFilter('');
    setYearFilter([1900, 2025]);
    setRatingFilter(0);
    if (onSearch) {
      onSearch({ query: '', genre: '', year: [1900, 2025], rating: 0 });
    }
  };

  const handleGenreChange = (e) => {
    setGenreFilter(e.target.value);
  };

  const handleYearChange = (event, newValue) => {
    setYearFilter(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRatingFilter(newValue);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
      
        <Grid item xs={6} md={2}>
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
        
        <Grid item xs={6} md={2}>
          <Button 
            variant="outlined" 
            onClick={toggleFilters}
            startIcon={<FilterListIcon />}
            sx={{
              borderColor: darkMode ? '#bb8115' : '#9e6c13',
              color: darkMode ? '#ffffff' : '#333333',
              '&:hover': {
                borderColor: '#bb8115',
                backgroundColor: 'rgba(187, 129, 21, 0.04)',
              },
              width: { xs: '100%', md: 'auto' }
            }}
          >
            Filters
          </Button>
        </Grid>
        
        {(searchInput || genreFilter || ratingFilter > 0 || yearFilter[0] !== 1900 || yearFilter[1] !== 2025) && (
          <Grid item xs={12} md={2}>
            <Button 
              variant="outlined" 
              onClick={handleClear}
              sx={{
                borderColor: darkMode ? '#bb8115' : '#9e6c13',
                color: darkMode ? '#ffffff' : '#333333',
                '&:hover': {
                  borderColor: '#bb8115',
                  backgroundColor: 'rgba(187, 129, 21, 0.04)',
                },
                width: { xs: '100%', md: 'auto' }
              }}
            >
              Clear All
            </Button>
          </Grid>
        )}

        {showFilters && (
          <>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{ 
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                },
                '& .MuiSelect-select': {
                  color: darkMode ? '#ffffff' : '#333333',
                }
              }}>
                <InputLabel>Genre</InputLabel>
                <Select
                  value={genreFilter}
                  label="Genre"
                  onChange={handleGenreChange}
                >
                  <MenuItem value="">All Genres</MenuItem>
                  {genres.map(genre => (
                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ 
                p: 2, 
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '4px',
                color: darkMode ? '#ffffff' : '#333333',
              }}>
                <Typography gutterBottom>Year Range</Typography>
                <Slider
                  value={yearFilter}
                  onChange={handleYearChange}
                  valueLabelDisplay="auto"
                  min={1900}
                  max={2025}
                  sx={{
                    '& .MuiSlider-thumb': {
                      color: '#bb8115',
                    },
                    '& .MuiSlider-track': {
                      color: '#bb8115',
                    },
                    '& .MuiSlider-rail': {
                      color: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">{yearFilter[0]}</Typography>
                  <Typography variant="body2">{yearFilter[1]}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ 
                p: 2, 
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '4px',
                color: darkMode ? '#ffffff' : '#333333',
              }}>
                <Typography gutterBottom>Minimum Rating</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating
                    name="rating-filter"
                    value={ratingFilter}
                    onChange={handleRatingChange}
                    precision={0.5}
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#bb8115',
                      },
                      '& .MuiRating-iconEmpty': {
                        color: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>{ratingFilter} / 5</Typography>
                </Box>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default SearchBar;