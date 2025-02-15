
import{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const SignupView = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const navigate = useNavigate();

    
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Name: name,
            Username: username,
            Password: password,
            Email: email,
            DateOfBirth: birthday 
        };

        fetch("https://reelrendezvous-0ea25cfde7d6.herokuapp.com/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
            
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data) {
                alert("Signup successful");
                navigate('/login');
            } else {
                alert("Signup failed");
            }
        })
    };

    return (
        <Form onSubmit={(handleSubmit)}>
            <h1>Signup</h1>
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