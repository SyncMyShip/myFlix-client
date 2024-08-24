import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";


export const FavoriteMovies = ({ movies, title, isFavoriteMovie }) => {
    const [isFav, setIsFav] = useState([]);
    const { Title } = useParams();
    const movie = movies.find((m) => m.title === Title);


    // useEffect(() => {
    //     const favorites = movies.map((movie) => {
    //         return {
    //             key
    //             title: movie.title
    //         }
    //     })
    //     setIsFav(favorites);
    // }, [movies]);


    return (
        <Row className="justify-content-md-center">
            <Col>
                <Card>
                    <Card.Header><h2>Favorites</h2></Card.Header>
                    <Card.Body>
                        {isFav.length > 0 ? (
                            isFav.map((movie) => (
                                    <Card.Text>{movie.title} </Card.Text>
                                    
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



// FavoriteMovies.propTypes = {
//     movies: PropTypes.string.isRequired,
//     // favorite: PropTypes.bool.isRequired,
//   };