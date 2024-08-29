
import{ useState } from "react";
import { Button, Col } from "react-bootstrap";
import React from "react";
import { onLoggedOut } from "../../state/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const DeleteUser = ({ username, onLoggedOut }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const {user,token} = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(token)

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
                dispatch(onLoggedOut());
                // navigate("/login")
            } else {
                alert("Failed to remove user");
            }
        
            setIsDeleting(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Col className="mb-3">
            <div>
                <Button
                    variant="danger"
                    onClick={deleteHandler}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting user...' : 'Delete User'}
                </Button>
            </div>
        </Col>
    )
}