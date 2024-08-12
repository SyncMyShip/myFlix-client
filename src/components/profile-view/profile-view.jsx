import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserProfile } from "./user-profile";
import { UpdateProfile } from "./update-profile";
import { DeleteUser } from "./delete-user";
import { FavoriteMovies } from "./favorites-view";
import { useNavigate } from "react-router";
import { MovieView } from "../movie-view/movie-view";


export const ProfileView = ({ user, token, handleFavorites }) => {
    const [movies, setMovies] = useState([]);
    const [favMovies, setFavMovies] = useState([]);
    const navigate = useNavigate();

// Handle Movies
    useEffect(() => {
        if (!token) return;
    
        fetch("https://reelrendezvous-0ea25cfde7d6.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((movies) => {
            const moviesFromApi = movies.map((movie) => {
              return {
                _id: movie._id,
                title: movie.Title,
                image: movie.ImagePath,
                description: movie.Description,
                genre: movie.Genre["Name"],
                director: movie.Director["Name"]
              };  
            });
            setMovies(moviesFromApi);
          }).catch((err) => {
            console.log(err)
          })
      }, [token]);

// Handle Users
    useEffect(() => {
        if (user) {
            setFavMovies(user.favMovies || []);
        }
    }, [user]);


    const favoritesList = movies.filter((m) => favMovies.includes(m._id));


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
                        name={user.Name}
                        username={user.Username}
                        password={user.Password}
                        email={user.Email}
                        birthday={user.DateOfBirth}
                        token={token}
                    /> 
                </div>

                <div>
                    <MovieView
                        movies={movies}
                        favMovies={favMovies}
                        favoritesHandler={handleFavorites}
                    />

                    <FavoriteMovies
                        user={user}
                        favMovies={favMovies}
                        favoritesHandler={handleFavorites}
                        favoritesList={favoritesList}
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