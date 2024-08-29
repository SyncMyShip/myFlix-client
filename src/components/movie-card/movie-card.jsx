import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {

    return (
        <Card className="h-100 custom-card"> {/* Added `shadow-sm` for a subtle shadow */}
            <Card.Header className="text-center">{movie.title}</Card.Header>
            <Card.Img 
                className="card-img-top" 
                variant="top" 
                src={movie.image} 
                alt={movie.title}
                style={{ height: '300px', objectFit: 'fill' }} // Ensures uniform image size
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{movie.title}</Card.Title> {/* Centered title */}
                <Card.Text className="mb-4 text-muted text-center">{movie.director}</Card.Text> {/* Muted director text */}
                <div className="mt-auto"> {/* Ensures the button stays at the bottom */}
                    <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                        <Button variant="primary" className="w-100">Open</Button> {/* Full-width button */}
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string,
        director: PropTypes.string,
    }).isRequired,
};