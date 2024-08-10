import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export const UserProfile = ({ name, username, email, birthday }) => {

    return (
        <Row className="justify-content-center w-100">
            <Col md={10}>
                <Card>
                    <Card.Header className="d-flex justify-content-center">Account Details</Card.Header>
                    <Card.Body>
                        <Card.Text><h1>Account Details</h1></Card.Text>
                        <Card.Text >Name: {name}</Card.Text>
                        <Card.Text >Username: {username}</Card.Text>
                        <Card.Text>Email: {email}</Card.Text>
                        <Card.Text>Birthday: {birthday}</Card.Text>
                     </Card.Body>
                     <Link to={"/"}> 
                        <Button className="back-button w-100 justify-content-cener">Back</Button>
                    </Link>
                </Card>
            </Col>
        </Row>
    );
}

UserProfile.propTypes = {
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date)
}