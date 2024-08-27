import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";


export const FavoriteMovies = ({}) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const { movies } = useSelector((state) => state.movies)
    const dispatch = useDispatch();

    // Set favorite movies when the component mounts or when `movies` updates
    useEffect(() => {
        if (movies && Array.isArray(movies)) {
                const isFavoriteMovie = user.FavoriteMovies;
                const favorites = movies.filter((movie) => isFavoriteMovie.includes(movie.id));
                dispatch(setFavoriteMovies(favorites));
            dispatch(setFavoriteMovies(favorites));
        }
    }, [movies]);


    return (
        <Row className="justify-content-md-center">
            <Col>
                <Card>
                    <Card.Header><h2>Favorites</h2></Card.Header>
                    <Card.Body>
                        {favoriteMovies.length > 0 ? (
                            favoriteMovies.map((movie) => (
                                <Card.Text key={movie.id}>
                                    {movie.title}
                                </Card.Text>
                            ))
                        ) : (
                            <Card.Text>No favorites found</Card.Text>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};


FavoriteMovies.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            // Add other movie properties if necessary
        })
    ).isRequired,
    isFavoriteMovie: PropTypes.arrayOf(PropTypes.string)
};