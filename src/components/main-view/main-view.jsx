import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
          id: 1,
          title: "Inception",
          description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
          director: "Christopher Nolan",
          genre: "Science Fiction",
          image:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
        },
        {
          id: 2,
          title: "The Grand Budapest Hotel",
          description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
          director: "Wes Anderson",
          genre: 
            "Drama",
          image:
            "https://m.media-amazon.com/images/M/MV5BMTY0NTI5MjE3MF5BMl5BanBnXkFtZTgwMDQ0Mzk4MDE@._V1_.jpg",
        },
        {
          id: 3,
          title: "Pulp Fiction",
          description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
          director: "Quentin Tarantino",
          genre: "Drama",
          image:
            "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        },
        {
          id: 4,
          title: "Spirited Away",
          description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, and where humans are changed into beasts.",
          director: "Hayao Miyazaki",
          genre: "Fantasy",
          image:
            "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        },
        {
          id: 5,
          title: "The Shawshank Redemption",
          description: "A Maine banker convicted of the murder of his wife and her lover in 1947 gradually forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
          director: "Frank Darabont",
          genre: "Drama",
          image:
            "https://m.media-amazon.com/images/M/MV5BMTQ1ODM2MjY3OV5BMl5BanBnXkFtZTgwMTU2MjEyMDE@._V1_.jpg",
        }
      ]);

      const [selectedMovie, setSelectedMovie] = useState(null);

      if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
      }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }} 
                />
            ))}
        </div>
    );
};