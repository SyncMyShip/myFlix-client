import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const movies = useSelector((state) => state.movies); 
    const [name] = useState(user?.Name); 
    const [username] = useState(user?.Username);
    const [email] = useState(user?.Email);
    const [birthday] = useState(user?.DateOfBirth ? new Date(user?.DateOfBirth) : ""); // Ensure birthday is a valid date object

    const formattedBirthday = birthday
        ? birthday.toISOString().split('T')[0].replace(/-/g, '-')
        : "No birthday available";

    // Filter the user's favorite movies
    const favoriteMovies = movies.filter((movie) => user?.FavoriteMovies?.includes(movie.id));

    return (
        <Row className="justify-content-center">
            <Col className="mb-3">
                <Card>
                    <Card.Header><h2>Account Details</h2></Card.Header>
                    <Card.Body>
                        <Card.Text><strong>Name:</strong> {name}</Card.Text>
                        <Card.Text><strong>Username:</strong> {username}</Card.Text>
                        <Card.Text><strong>Email:</strong> {email}</Card.Text>
                        <Card.Text><strong>Birthday:</strong> {formattedBirthday}</Card.Text>
                        <Card.Text><strong>Favorites:</strong></Card.Text>
                        {favoriteMovies.length > 0 ? (
                            favoriteMovies.map((movie) => (
                                <Card.Text key={movie.id}>
                                    {movie.title}
                                </Card.Text>
                            ))
                        ) : (
                            <Card.Text>No favorite movies found.</Card.Text>
                        )}
                        <Link to={"/"}>
                            <Button variant="primary" className="back-button">Back</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

UserProfile.propTypes = {
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.string,
};