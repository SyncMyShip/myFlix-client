import React from 'react';
import { useSelector } from 'react-redux';
import { SearchBar } from '../movies-filter/search-bar'; // Adjust the path based on your project structure

export const MovieList = () => {
  const movies = useSelector((state) => state.movies.list); // Getting the list of movies
  const filter = useSelector((state) => state.movies.filter); // Getting the search filter

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <SearchBar />
      <ul>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))
        ) : (
          <li>No movies found</li>
        )}
      </ul>
    </div>
  );
};