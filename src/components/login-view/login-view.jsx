import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../state/users/usersSlice";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        }

        fetch("https://reelrendezvous-0ea25cfde7d6.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.success) {
                // localStorage.setItem("user", JSON.stringify(data.user));
                // localStorage.setItem("token", data.token);
                const { user, token } = data.data;
                dispatch(setUser(user));
                dispatch(setToken(token));
            } else {
                alert("No such user");
                navigate("/signup")
            }
        })
        .catch((e) => {
            alert("Something went wrong")
        });
    };



    return (
        <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={10}
                />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
};