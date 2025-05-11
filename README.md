# Movie Explorer

A React application that allows users to explore trending movies and TV shows, search for specific titles, view details, and maintain a list of favorites.

## Project Overview

Movie Explorer is built using React and integrates with The Movie Database (TMDB) API to fetch movie and TV show data. The application features a responsive design implemented with Material-UI components.

## Features

- **User Authentication**: Simple login system to personalize the user experience (use username: "user" and password: "movie2025")
- **Browse Trending Content**: View trending movies and TV shows for the current week
- **Toggle Between Movies and TV Shows**: Switch content type with a single click
- **Search Functionality**: Search for movies by title, release year, and minimum rating
- **Movie Details**: View comprehensive information about movies including:
  - Overview
  - Rating
  - Release date
  - Genres
  - Official trailer (when available)
- **Favorites System**: Add movies to favorites and access them via a dedicated page
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Responsive Design**: Optimized for all screen sizes

## Technical Implementation

### API Integration

The application uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to fetch movie data:

- Trending movies/TV shows: `/trending/{media_type}/week`
- Movie details: `/movie/{movie_id}`
- Movie search: `/search/movie`
- Movie videos (trailers): `/movie/{movie_id}/videos`

### Project Structure

- `components/`: Reusable UI components
  - `MovieCard.js`: Displays movie poster and basic information
  - `MovieDetails.js`: Shows comprehensive movie information
  - `SearchBar.js`: Handles movie search functionality
  - `TrendingMovies.js`: Displays trending content with infinite scrolling
  - `Favorites.js`: Manages user's favorite movies
  - `Login.js`: Handles user authentication
  - `header.js` & `footer.js`: Layout components
- `context/`: React Context API implementation
  - `MovieContext.js`: Manages global state (user, movies, favorites, theme)

### State Management

The application uses React Context API for state management:
- User authentication state
- Movie list management
- Favorites persistence (using localStorage)
- Theme preferences (dark/light mode)

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (v6 or higher)
- TMDB API key (create one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation Steps

1. Clone the repository:
   ```
   git clone [your-repo-url]
   cd movie-explorer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm start
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
The build is minified and optimized for best performance.

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: Navigation and routing
- **Material-UI**: React component library implementing Google's Material Design
- **Axios**: Promise-based HTTP client for API requests
- **localStorage**: Browser storage for persisting favorites and theme preferences

## Future Enhancements

- User registration and secure authentication
- Advanced filtering options for movie search
- User ratings and reviews
- Recommendations based on viewing history
- Social sharing features
