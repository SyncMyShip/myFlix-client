import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null); 

  useEffect(() => {
    if (!token) return;

    fetch("https://reelrendezvous-0ea25cfde7d6.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre["Name"],
            director: movie.Director["Name"]
          };  
        });
        setMovies(moviesFromApi);
      })
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <Col md={6} style={{padding: "50px"}}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
            />
          </Col>
          <Col md={6} style={{padding: "50px"}}>
            <SignupView />
          </Col>
        </>
      ) : selectedMovie ? (
        <>
        <Col md={8}>
        <MovieView 
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)} 
        />
        </Col>
        </>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
        <Col className="mb-5" md={3} key={movie.id}>
            <MovieCard 
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }} 
            />
        </Col>
          ))}
        <Col>
          <Button className="mb-3" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
        </Col>
        </>
      )
      }
    </Row>
  );
};