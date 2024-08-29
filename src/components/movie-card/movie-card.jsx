import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {

    return (
        <Card className="h-100 custom-card"> 
            <Card.Header className="text-center">{movie.title}</Card.Header>
            <Card.Img 
                className="card-img-top" 
                variant="top" 
                src={movie.image} 
                alt={movie.title}
                style={{ height: '300px', objectFit: 'fill' }} 
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{movie.title}</Card.Title> 
                <Card.Text className="mb-4 text-muted text-center">{movie.director}</Card.Text> 
                <div className="mt-auto"> 
                    <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                        <Button variant="primary" className="w-100">Open</Button>
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