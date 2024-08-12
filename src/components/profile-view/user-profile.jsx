import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export const UserProfile = ({ name, username, email, birthday }) => {

    return (
        <Row className="justify-content-center">
            <Col className="mb-3">
                <Card>
                    <Card.Header><h2>Account Details</h2></Card.Header>
                    <Card.Body>
                        <Card.Text>Name: {name}</Card.Text>
                        <Card.Text>Username: {username}</Card.Text>
                        <Card.Text>Email: {email}</Card.Text>
                        <Card.Text>Birthday: {birthday}</Card.Text>
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
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string
}