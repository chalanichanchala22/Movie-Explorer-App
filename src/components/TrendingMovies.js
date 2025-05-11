import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/MovieContext';
import axios from 'axios';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import { Container, Grid, Button, Box, Typography } from '@mui/material';

const getTrendingStyles = (darkMode) => ({
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
    minHeight: '100vh', // Add this to ensure full viewport height
  },
  container: {
    position: 'relative',
    padding: '30px', 
    width: '100%',
    margin: '0',
    height: '100%', // Add this to ensure full height
    minHeight: 'inherit', // Inherit minHeight from parent
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: darkMode ? 'rgba(85, 84, 81, 0.82)' : 'rgb(255, 255, 255)',
      zIndex: 1,
    },
  },
  title: {
    color: darkMode ? '#ffffff' : '#333333',
    mb: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    zIndex: 3,
    position: 'relative',
    flexDirection: 'column',
    width: '100%',
    height:'100%',
    padding: '0 20px',
  },
  button: {
    zIndex: 2,
    backgroundColor: '#bb8115',
    color: '#ffffff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#bb8115',
    },
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
});

function TrendingMovies() {
  const { movies, setMovies, mediaType, darkMode } = useContext(MovieContext);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState({
    query: '',
    genre: '',
    year: [1900, 2025],
    rating: 0
  });
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  
  const trendingStyles = getTrendingStyles(darkMode);

  useEffect(() => {
    // Only fetch trending if not searching
    if (!isSearching) {
      const fetchTrending = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
          );
          if (page === 1) {
            setMovies(response.data.results);
          } else {
            setMovies((prev) => [...prev, ...response.data.results]);
          }
        } catch (error) {
          console.error(`Error fetching trending ${mediaType}:`, error);
          alert(`Failed to fetch trending ${mediaType === 'movie' ? 'movies' : 'TV shows'}. Please try again later.`);
        }
      };
      fetchTrending();
    }
  }, [page, setMovies, mediaType, isSearching]);

  // Apply filters to movies
  useEffect(() => {
    if (isSearching && movies.length > 0) {
      let results = [...movies];
      
      // Filter by genre if selected
      if (searchParams.genre) {
        // The genre IDs in TMDB don't match names directly, so we need to check genre names in movie.genre_ids
        // This is a simplification - in a real app you would map genre IDs to names using the TMDB genres API
        results = results.filter(movie => 
          movie.genre_ids && 
          movie.genre_ids.some(id => {
            // Map common genre IDs to names (simplified)
            const genreMap = {
              28: 'Action',
              12: 'Adventure',
              16: 'Animation',
              35: 'Comedy',
              80: 'Crime',
              99: 'Documentary',
              18: 'Drama',
              14: 'Fantasy',
              27: 'Horror',
              9648: 'Mystery',
              10749: 'Romance',
              878: 'Sci-Fi',
              53: 'Thriller'
            };
            return genreMap[id] === searchParams.genre;
          })
        );
      }
      
      // Filter by year range
      if (searchParams.year && (searchParams.year[0] !== 1900 || searchParams.year[1] !== 2025)) {
        results = results.filter(movie => {
          const releaseDate = movie.release_date || movie.first_air_date || '';
          if (!releaseDate) return false;
          
          const year = parseInt(releaseDate.split('-')[0]);
          return year >= searchParams.year[0] && year <= searchParams.year[1];
        });
      }
      
      // Filter by rating
      if (searchParams.rating > 0) {
        // TMDB uses a 10-point scale, so convert our 5-point scale
        const minRating = searchParams.rating * 2;
        results = results.filter(movie => movie.vote_average >= minRating);
      }
      
      setFilteredMovies(results);
      setNoResults(results.length === 0);
    } else {
      setFilteredMovies(movies);
      setNoResults(movies.length === 0);
    }
  }, [movies, isSearching, searchParams]);

  const handleSearch = async (params) => {
    setSearchParams(params);
    
    if (params.query || params.genre || params.rating > 0 || params.year[0] !== 1900 || params.year[1] !== 2025) {
      setIsSearching(true);
      setPage(1);
      
      try {
        // Always start with a query search if there's a query
        if (params.query) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/${mediaType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${params.query}&page=1`
          );
          setMovies(response.data.results);
        } 
        // If no query but has filters, get discover endpoint
        else if (params.genre || params.rating > 0 || params.year[0] !== 1900 || params.year[1] !== 2025) {
          let requestUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=1`;
          
          // Add filters to the discover request
          if (params.genre) {
            // Convert genre name to ID (simplified)
            const genreIdMap = {
              'Action': 28,
              'Adventure': 12,
              'Animation': 16,
              'Comedy': 35,
              'Crime': 80,
              'Documentary': 99,
              'Drama': 18,
              'Fantasy': 14,
              'Horror': 27,
              'Mystery': 9648,
              'Romance': 10749,
              'Sci-Fi': 878,
              'Thriller': 53
            };
            
            if (genreIdMap[params.genre]) {
              requestUrl += `&with_genres=${genreIdMap[params.genre]}`;
            }
          }
          
          if (params.year[0] !== 1900 || params.year[1] !== 2025) {
            requestUrl += `&primary_release_date.gte=${params.year[0]}-01-01&primary_release_date.lte=${params.year[1]}-12-31`;
          }
          
          if (params.rating > 0) {
            // TMDB uses a 10-point scale
            const minRating = params.rating * 2;
            requestUrl += `&vote_average.gte=${minRating}`;
          }
          
          const response = await axios.get(requestUrl);
          setMovies(response.data.results);
        }
      } catch (error) {
        console.error(`Error searching ${mediaType}:`, error);
        alert(`Failed to search ${mediaType === 'movie' ? 'movies' : 'TV shows'}. Please try again later.`);
        setMovies([]);
      }
    } else {
      // Reset to trending when search is cleared
      setIsSearching(false);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const loadMoreSearch = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    try {
      if (searchParams.query) {
        // Load more search results by query
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/${mediaType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchParams.query}&page=${nextPage}`
        );
        setMovies((prev) => [...prev, ...response.data.results]);
      } else {
        // Load more discover results
        let requestUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${nextPage}`;
        
        // Add filters to the discover request
        if (searchParams.genre) {
          const genreIdMap = {
            'Action': 28,
            'Adventure': 12,
            'Animation': 16,
            'Comedy': 35,
            'Crime': 80,
            'Documentary': 99,
            'Drama': 18,
            'Fantasy': 14,
            'Horror': 27,
            'Mystery': 9648,
            'Romance': 10749,
            'Sci-Fi': 878,
            'Thriller': 53
          };
          
          if (genreIdMap[searchParams.genre]) {
            requestUrl += `&with_genres=${genreIdMap[searchParams.genre]}`;
          }
        }
        
        if (searchParams.year[0] !== 1900 || searchParams.year[1] !== 2025) {
          requestUrl += `&primary_release_date.gte=${searchParams.year[0]}-01-01&primary_release_date.lte=${searchParams.year[1]}-12-31`;
        }
        
        if (searchParams.rating > 0) {
          const minRating = searchParams.rating * 2;
          requestUrl += `&vote_average.gte=${minRating}`;
        }
        
        const response = await axios.get(requestUrl);
        setMovies((prev) => [...prev, ...response.data.results]);
      }
    } catch (error) {
      console.error(`Error loading more results:`, error);
      alert(`Failed to load more results. Please try again later.`);
    }
  };

  const getPageTitle = () => {
    if (isSearching) {
      let title = [];
      
      if (searchParams.query) {
        title.push(`"${searchParams.query}"`);
      }
      
      if (searchParams.genre) {
        title.push(searchParams.genre);
      }
      
      if (searchParams.year[0] !== 1900 || searchParams.year[1] !== 2025) {
        title.push(`${searchParams.year[0]}-${searchParams.year[1]}`);
      }
      
      if (searchParams.rating > 0) {
        title.push(`${searchParams.rating}+ Stars`);
      }
      
      return `Results for ${title.join(', ')}`;
    }
    
    return `Trending ${mediaType === 'movie' ? 'Movies' : 'TV Shows'} This Week`;
  };

  return (
    <Box sx={trendingStyles.pageWrapper}>
      <Box sx={trendingStyles.container}>
        <Container sx={trendingStyles.content}>
          <Typography variant="h4" component="h1" sx={trendingStyles.title}>
            {getPageTitle()}
          </Typography>
          
          <SearchBar onSearch={handleSearch} />
          <Grid container spacing={3}>
            {filteredMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Box sx={trendingStyles.cardWrapper}>
                  <MovieCard movie={movie} />
                </Box>
              </Grid>
            ))}
          </Grid>
          {filteredMovies.length > 0 ? (
            <Button 
              variant="contained" 
              onClick={isSearching ? loadMoreSearch : loadMore} 
              sx={{ ...trendingStyles.button, margin: '20px auto', display: 'block' }}
            >
              Load More
            </Button>
          ) : (
            <Typography variant="h6" sx={{textAlign: 'center', my: 4}}>
              {noResults ? 'No results found. Try different search criteria.' : 'Loading...'}
            </Typography>
          )}
        </Container>
      </Box>
      {/* Include footer here */}
    </Box>
  );
}

export default TrendingMovies;