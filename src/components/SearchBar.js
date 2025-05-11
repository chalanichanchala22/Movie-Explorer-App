import { useContext, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Box, TextField, Button, Grid, Typography, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch }) {
  const { darkMode } = useContext(MovieContext);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchInput);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchInput('');
    if (onSearch) {
      onSearch('');
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
        
        {searchInput && (
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
              Clear
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default SearchBar;