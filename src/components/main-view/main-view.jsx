import { useState, useEffect } from "react";
import "./main-view.scss";
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
import { setToken, setUser, onLoggedOut } from "../../state/users/usersSlice";

export const MainView = () => {
  const { user, token } = useSelector((state) => state.user);
  const movies = useSelector((state) => state.movies);
  const [moviesSearch, setMoviesSearch] = useState("");

  const dispatch = useDispatch();

  // Fetching movies
  useEffect(() => {
    if (!token) return;

    fetch("https://reelrendezvous-0ea25cfde7d6.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImagePath,
          description: movie.Description,
          genre: movie.Genre?.Name,
          director: movie.Director?.Name,
        }));
        dispatch(setMovies(moviesFromApi));
      });
  }, [token]);

  // Filter movies based on search input
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(moviesSearch.toLowerCase())
  );

  // Only display the filtered movies in the movie list
  const displayMovies = moviesSearch ? filteredMovies : movies;

  const onLoggedIn = (user, token) => {
    dispatch(setUser(user));  // Dispatch user to Redux store
    dispatch(setToken(token));  // Dispatch token to Redux store
    localStorage.setItem("user", JSON.stringify(user));  // Sync with localStorage
    localStorage.setItem("token", token);
  };

// const onLoggedOut = () => {
//   setUser(null);
//   setToken(null);
//   localStorage.clear();
// }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        // onLoggedOut={dispatch(onLoggedOut)}
        moviesSearch={moviesSearch}
        setMoviesSearch={setMoviesSearch}
      />
      <Row className="justify-content-md-center">
        <Routes>
        <Route
  path="/signup"
  element={
    user ? (
      <Navigate to="/" />
    ) : (
      <Col md={6} style={{ padding: "50px" }}>
        <SignupView />
      </Col>
    )
  }
/>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={6} style={{ padding: "50px" }}>
                  <LoginView onLoggedIn={onLoggedIn}/>
                </Col>
              )
            }
          />
          <Route
            path="/users/:Username"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col style={{ padding: "50px" }}>
                  <ProfileView user={user} movies={movies} />
                </Col>
              )
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
                  <Col md={9}>
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
              !user ? (
                <Navigate to="/login" replace />
              ) : displayMovies.length === 0 ? (
                <Col>No movies found!</Col>
              ) : (
                <>
                  {displayMovies.map((movie) => (
                    <Col className="mb-5 d-flex" xs={12} sm={9} md={4} lg={3} key={movie.id}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

// import { useState, useEffect } from "react";
// import { MovieCard } from "../movie-card/movie-card";
// import { MovieView } from "../movie-view/movie-view";
// import { LoginView } from "../login-view/login-view";
// import { SignupView } from "../signup-view/signup-view";
// import { ProfileView } from "../profile-view/profile-view";
// import { NavigationBar } from "../navigation-bar/navigation-bar";
// import { Row, Col } from "react-bootstrap";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setMovies } from "../../state/movies/moviesSlice";

// export const MainView = () => {
//   const { user, token } = useSelector((state) => state.user);
//   const movies = useSelector((state) => state.movies);
//   const [moviesSearch, setMoviesSearch] = useState("");

//   const dispatch = useDispatch();

//   // Fetching movies
//   useEffect(() => {
//     if (!token) return;

//     fetch("https://reelrendezvous-0ea25cfde7d6.herokuapp.com/movies", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const moviesFromApi = data.map((movie) => ({
//           id: movie._id,
//           title: movie.Title,
//           image: movie.ImagePath,
//           description: movie.Description,
//           genre: movie.Genre?.Name,
//           director: movie.Director?.Name,
//         }));
//         dispatch(setMovies(moviesFromApi));
//       });
//   }, [token, dispatch]);

//   // Filter movies based on search input
//   const filteredMovies = movies.filter((movie) =>
//     movie.title.toLowerCase().includes(moviesSearch.toLowerCase())
//   );

//   const displayMovies = moviesSearch ? filteredMovies : movies;

//   return (
//     <BrowserRouter>
//       <NavigationBar
//         user={user}
//         moviesSearch={moviesSearch}
//         setMoviesSearch={setMoviesSearch}
//       />
//       <Row className="justify-content-md-center">
//         <Routes>
//           <Route
//             path="/signup"
//             element={
//               user ? (
//                 <Navigate to="/" />
//               ) : (
//                 <Col md={6} style={{ padding: "50px" }}>
//                   <SignupView />
//                 </Col>
//               )
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               user ? (
//                 <Navigate to="/" />
//               ) : (
//                 <Col md={6} style={{ padding: "50px" }}>
//                   <LoginView />
//                 </Col>
//               )
//             }
//           />
//           <Route
//             path="/users/:Username"
//             element={
//               !user ? (
//                 <Navigate to="/login" replace />
//               ) : (
//                 <Col style={{ padding: "50px" }}>
//                   <ProfileView user={user} movies={movies} />
//                 </Col>
//               )
//             }
//           />
//           <Route
//             path="/movies/:Title"
//             element={
//               !user ? (
//                 <Navigate to="/login" replace />
//               ) : displayMovies.length === 0 ? (
//                 <Col>The list is empty!</Col>
//               ) : (
//                 <>
//                   {displayMovies.map((movie) => (
//                     <Col md={6} key={movie.id} style={{ padding: "50px" }}>
//                       <MovieView movie={movie} />
//                     </Col>
//                   ))}
//                 </>
//               )
//             }
//           />
//           <Route
//             path="/"
//             element={
//               !user ? (
//                 <Navigate to="/login" replace />
//               ) : displayMovies.length === 0 ? (
//                 <Col>No movies found!</Col>
//               ) : (
//                 <>
//                   {displayMovies.map((movie) => (
//                     <Col 
//                     className="mb-5" md={3} key={movie.id}>
//                       <MovieCard movie={movie} />
//                     </Col>
//                   ))}
//                 </>
//               )
//             }
//           />
//         </Routes>
//       </Row>
//     </BrowserRouter>
//   );
// };