import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { MovieContext } from '../context/MovieContext';
import { Button, Box, ToggleButtonGroup, ToggleButton, IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = () => {
  const { mediaType, setMediaType, darkMode, setDarkMode, themeColors } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleMediaTypeChange = (event, newValue) => {
    if (newValue !== null) {
      setMediaType(newValue);
    }
  };
  
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  const headerStyles = {
    button: {
      backgroundColor: themeColors.button.background,
      color: themeColors.button.text,
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: themeColors.button.hover,
      },
    },
    toggleButton: {
      color: themeColors.text.primary,
      borderColor: themeColors.text.accent,
      '&.Mui-selected': {
        backgroundColor: themeColors.button.background,
        color: themeColors.button.text,
        '&:hover': {
          backgroundColor: themeColors.button.hover,
        },
      },
    },
    themeToggle: {
      color: themeColors.text.primary,
      border: `1px solid ${themeColors.text.primary}`,
      borderRadius: '50%',
      padding: '8px',
      marginLeft: '10px',
    },
    backButton: {
      color: themeColors.text.primary,
      border: `1px solid ${themeColors.text.primary}`,
      borderRadius: '50%',
      padding: '8px',
      marginRight: '10px',
    },
    controlsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Box sx={headerStyles.logoContainer}>
          <div className="logo">
            <Link to="/">Login</Link>
          </div>
        </Box>
        
        <Box sx={headerStyles.controlsContainer}>
          <Button component={Link} to="/favorites" sx={headerStyles.button}>
            View Favorites
          </Button>
          
          <ToggleButtonGroup
            value={mediaType}
            exclusive
            onChange={handleMediaTypeChange}
            aria-label="media type"
            sx={{ backgroundColor: darkMode ? 'rgba(20, 20, 30, 0.8)' : 'rgba(255,255,255,0.2)', borderRadius: 1 }}
          >
            <ToggleButton value="movie" aria-label="movies" sx={headerStyles.toggleButton}>
              Movies
            </ToggleButton>
            <ToggleButton value="tv" aria-label="tv shows" sx={headerStyles.toggleButton}>
              TV Shows
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Tooltip title="Go Back">
            <IconButton onClick={handleBack} sx={headerStyles.backButton}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={toggleTheme} sx={headerStyles.themeToggle}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
      </div>
    </header>
  );
};

export default Header;