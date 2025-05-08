import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import MovieDetails from './components/MovieDetails';
import TrendingMovies from './components/TrendingMovies';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<TrendingMovies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/searchBar" element={<SearchBar />} />
      </Routes>
    </Router>
  );
}

export default App;