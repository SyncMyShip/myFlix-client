import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../state/movies/moviesSlice";

export const MainView = ( ) => {
  const movies = useSelector((state) => state.movies);
  const { user, token } = useSelector((state) => state.user)
  // const [movies, setMovies] = useState([]);
  // const [user, setUser] = useState(storedUser ? storedUser : null);
  // const [token, setToken] = useState(storedToken ? storedToken : null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    fetch("https://reelrendezvous-0ea25cfde7d6.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre?.[0],
            director: movie.Director?.[0],
          };
        });
        dispatch(setMovies(moviesFromApi));
      });
  }, [token]);

  // const syncUser = (user) => {
  //   localStorage.setItem("user", JSON.stringify(user));
  //     setUser(user);
  // }

  return (
    <BrowserRouter>
      <NavigationBar/>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6} style={{ padding: "50px" }}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6} style={{ padding: "50px" }}>
                    <LoginView/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/users/:Username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace/>
                ) : (
                  <Col style={{ padding: "50px" }}>
                    <ProfileView 
                      // user={user} 
                      // token={token} 
                      // movies={movies} 
                      // syncUser={syncUser}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:Title"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={6} style={{ padding: "50px" }}>
                    <MovieView
                      // movies={movies}
                      // token={token}
                      // syncUser={syncUser}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" md={3} key={movie.id}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};