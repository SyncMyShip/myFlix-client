import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";


export const FavoriteMovies = ({ user, favMovies, favoritesHandler, favoritesList }) => {
    return (
        <>
            <Card>
                <Card.Header><h2>Favorites</h2></Card.Header>
                <Row className="justify-content-md-center">
                    {favoritesList.length > 0 ? (
                        favoritesList.map((movie) => (
                            <Col md={4} className="mb-3" key={movie._id}>
                                <MovieCard
                                    movie={movie}
                                    isFavoriteMovie={favMovies.includes(movie._id)}
                                    toggleFavorites={favoritesHandler}
                                    user={user}
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
        _id: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string,
        favMovies: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    favMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    ).isRequired
};