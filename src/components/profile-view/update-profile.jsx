
import{ useState, useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React from "react";
import PropTypes from "prop-types";

export const UpdateProfile = ({ user, token }) => {
    // const token = localStorage.getItem("token");
    const [name, setName] = useState(user?.Name || "");
    const [username, setUsername] = useState(user?.Username || "");
    const [email, setEmail] = useState(user?.Email || "");
    const [birthday, setBirthday] = useState(user?.DateOfBirth || "");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {

        const isFormValid = name || username || email || birthday;
        setIsValid(isFormValid);
    }, [name, username, email, birthday]);

        const handleSubmit = async (event) => {
                event.preventDefault();

            const originalUsername = user.Username;

            try {
            const response = await fetch(`https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users/${originalUsername}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    Name: name,
                    Username: username,
                    Email: email,
                    DateOfBirth: birthday
                })
            });
        

                if (response.ok) {
                    // const data = await response.json();
                    alert("User successfully updated");
                    // syncUser(data)
                } else {
                    const errData = await response.json()
                    console.error("Update failed:", errData)
                    alert("Failed to update user");
                }
            } catch (err) {
                    console.error("Error updating user:", err);
                }
    };

    return (
        <Row className="justify-content-center">
            <Col className="mb-3">
                <Card>
                    <Card.Header><h2>Update User</h2></Card.Header>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name:</Form.Label>
                        <Form.Control 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                        <Form.Control 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minLength={6}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                        <Form.Control 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBirthday">
                            <Form.Label>Date of Birth:</Form.Label>
                        <Form.Control 
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit"
                            disabled={!isValid}
                        >
                            Update
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}


