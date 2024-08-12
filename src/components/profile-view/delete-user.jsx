
import{ useState } from "react";
import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

export const DeleteUser = ({ username, token, onLoggedOut }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const deleteHandler = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users/${username}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
        
            if (response.ok) {
                alert("User successfully removed");
                onLoggedOut
                navigate("/login")
            } else {
                alert("Failed to remove user");
            }
        
            setIsDeleting(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Button
                variant="danger"
                onClick={deleteHandler}
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting user...' : 'Delete User'}
            </Button>
        </div>
    )
}