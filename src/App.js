import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/header';
import Footer from './components/footer';
import SearchBar from './components/SearchBar';
import MovieDetails from './components/MovieDetails';
import TrendingMovies from './components/TrendingMovies';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
        <div className="app">
        <Header />
         <main className="main-content">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<TrendingMovies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/searchBar" element={<SearchBar />} />
      </Routes>
      </main>
        <Footer />
       </div>
    </Router>
  );
}

export default App;