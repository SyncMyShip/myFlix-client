import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { UserProfile } from "./user-profile";
import { UpdateProfile } from "./update-profile";
import { DeleteUser } from "./delete-user";
import { FavoriteMovies } from "./favorites-view";
import { useNavigate } from "react-router";


export const ProfileView = ({ user, token, movies, isFavoriteMovie, handleFavoritesList }) => {
    const navigate = useNavigate();
    // const [movies, setMovies] = useState([]);

// // Handle Movies
//     useEffect(() => {
//         if (!token) return;
    
//         fetch("https://reelrendezvous-0ea25cfde7d6.herokuapp.com/movies", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => response.json())
//         .then((movies) => {
//             const moviesFromApi = movies.map((movie) => {
//               return {
//                 _id: movie._id,
//                 title: movie.Title,
//                 image: movie.ImagePath,
//                 description: movie.Description,
//                 genre: movie.Genre["Name"],
//                 director: movie.Director["Name"]
//               };  
//             });
//             setMovies(moviesFromApi);
//           }).catch((err) => {
//             console.log(err)
//           })
//       }, [token]);




    return (
        <Row className="justify-content-center">
            <Col md={10} className="align-items-stretch">
                <div>
                    <UserProfile
                        name={user.Name}
                        username={user.Username}
                        email={user.Email}
                        birthday={user.DateOfBirth}
                    />
                </div>

                <div>
                    <UpdateProfile
                        user={user}
                        name={user.Name}
                        username={user.Username}
                        email={user.Email}
                        birthday={user.DateOfBirth}
                        token={token}
                    /> 
                </div>
                <div>
                    <FavoriteMovies
                        user={user}
                        movies={movies}
                        title={movies.Title}
                        token={token}
                        isFavoriteMovie={isFavoriteMovie}
                        // addMovieToFavorites={movieId}
                        handleFavoritesList={handleFavoritesList}
                        // removeMovieFromFavorites={movieId}
                    />
                </div>

                <div>
                    <DeleteUser
                        username={user.Username}
                        token={token}
                        onLoggedOut={() => {
                            localStorage.clear();
                            navigate("/login")
                        }}
                    />
                </div>
            </Col>
        </Row>
    );
}