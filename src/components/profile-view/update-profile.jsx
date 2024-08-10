
import{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const UpdateProfile = (user, updatedUser) => {
    const storedToken = JSON.parse(localStorage.getItem("token"));

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Name: name,
            Username: username,
            Password: password,
            Email: email,
            DateOfBirth: birthday 
        };

        fetch(`https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users/${encodeURIComponent(user.Username)}`,
        {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${storedToken}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("User update successful");
                window.location.reload();
                return response.json();
            } else {
                alert("User update failed");
            }
        }).then((data) => {
            updatedUser(data);
            setName(data.Name),
            setUsername(data.Username),
            setPassword(data.Password),
            setEmail(data.Email),
            setBirthday(data.DateOfBirth)
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <Form onSubmit={(handleSubmit)}>
            <h1>Update User</h1>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name:</Form.Label>
            <Form.Control 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
            <Form.Control 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
            <Form.Control 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email:</Form.Label>
            <Form.Control 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBirthday">
                <Form.Label>Date of Birth:</Form.Label>
            <Form.Control 
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
}



export const FavoritesView = (movie) => {
    return (
        <Card className="h-100">
            <Card.Title className="d-flex justify-content-center">{movie.title}</Card.Title>
            <Card.Body>           
                <Card.Img className="w-100" variant="top" src={movie.image} />
                <Card.Text>{movie.description}</Card.Text>
                <Card.Title>{movie.director}</Card.Title>
                <Card.Text>{movie.genre}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <Button variant="primary">Movie Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}


FavoritesView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string,
        director: PropTypes.string,
    }).isRequired,
};



export const DeleteUser = () => {
fetch(`https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users/${encodeURIComponent(user.Username)}}`,
{
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${storedToken}`
    }
}).then((response) => {
    if (response.ok) {
        alert("User successfully removed");
        window.location.reload();
    } else {
        alert("Failed to remove user");
    }
})
};