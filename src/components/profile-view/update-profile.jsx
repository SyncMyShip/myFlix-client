import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../state/users/usersSlice";

export const UpdateProfile = ({ token }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [name, setName] = useState(user?.Name || "");
    const [username, setUsername] = useState(user?.Username || "");
    const [email, setEmail] = useState(user?.Email || "");
    const [birthday, setBirthday] = useState(user?.DateOfBirth?.split('T')[0] || ""); // Handling date format
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        // Form is valid if all fields have values
        const isFormValid = name && username && email && birthday;
        setIsValid(isFormValid);
    }, [name, username, email, birthday]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const originalUsername = user?.Username; 
        try {
            const response = await fetch(`https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users/${originalUsername}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    Name: name,
                    Username: username,
                    Email: email,
                    DateOfBirth: birthday,
                }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                dispatch(setUser(updatedUser)); 
                localStorage.setItem("user", JSON.stringify(updatedUser)); 
                alert("User successfully updated");
                location.reload();
            } else {
                const errData = await response.json();
                console.error("Update failed:", errData);
                alert("Failed to update user");
            }
        } catch (err) {
            console.error("Error updating user:", err);
            alert("An error occurred during the update.");
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
};