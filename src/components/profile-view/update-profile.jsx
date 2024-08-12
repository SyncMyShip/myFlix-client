
import{ useState } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React from "react";
import PropTypes from "prop-types";

export const UpdateProfile = (updatedUser) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));

    // const [editedUser, setEditedUser] = useState(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            Name: name,
            Username: username,
            Password: password,
            Email: email,
            DateOfBirth: birthday 
        };

        try {
            const response = fetch(`https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users/${username}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        // then((response) => {
            if (response.ok) {
                const updatedData = await response.json();
                alert("User update successful");
                // return updatedData = response.json();
                updatedUser(updatedData)
            } else {
                alert("User update failed");
            }
        }
            catch (err) {
                console.log(err)
            }
        // }).then((data) => {
        //     // updatedUser(data);
        //     setName(name),
        //     setUsername(username),
        //     setPassword(password),
        //     setEmail(email),
        //     setBirthday(birthday)
        //     window.location.reload();
        // }).catch((err) => {
        //     console.log(err);
        // })
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

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                        <Form.Control 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={10}
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
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

UpdateProfile.propTypes = {
    user: PropTypes.object.isRequired,
    // updatedUser: PropTypes.func.isRequired
}

