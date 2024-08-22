import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";


export const FavoriteMovies = ({ user, movies, favoritesHandler, favoritesList }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const movieId = movies.id;

    const addMovieToFavorites = async (movieId) => {
            try {
            const response = await fetch(`https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
        

                if (response.ok) {
                    alert("Movie added to Favorites");
                    favoritesHandler(movieId, "add");
                } else {
                    const errData = await response.json()
                    console.error("Failed to add movie to Favorites:", errData)
                    alert("Failed to add movie to Favorites");
                }
            } catch (err) {
                    console.error("Error adding movie to Favorites:", err);
                }
    };


    const removeMovieFromFavorites = async (movieId) => {
            try {
            const response = await fetch(`https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
        

                if (response.ok) {
                    alert("Movie removed from Favorites");
                    favoritesHandler(movieId, "remove");
                } else {
                    const errData = await response.json()
                    console.error("Failed to remove movie from Favorites:", errData)
                    alert("Failed to remove movie from Favorites");
                }
            } catch (err) {
                    console.error("Error removing movie from Favorites:", err);
                }
    };

    return (
        <>
            <Card>
                <Card.Header><h2>Favorites</h2></Card.Header>
                <Row className="justify-content-md-center">
                    {favoritesList ? (
                        favoritesList.map((movie) => (
                            <Col md={4} className="mb-3" key={movie._id}>
                                <MovieView
                                    key={movie._id}
                                    movies={movies}
                                    isFavoriteMovie={true}
                                    addFavorite={() => addMovieToFavorites(movie._id)}
                                    removeFavorite={() => removeMovieFromFavorites(movie._id)}
                                />
                            </Col>
                        ))
                    ) : (
                        <Col>
                            No favorites found
                        </Col>
                    )}
                </Row>
            </Card>
        </>
    );
};



FavoriteMovies.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string,
    }).isRequired,
    favoritesHandler: PropTypes.func.isRequired,
    favoritesList: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string,
            description: PropTypes.string.isRequired,
            genre: PropTypes.string,
            director: PropTypes.string
        })
    ).isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired
};