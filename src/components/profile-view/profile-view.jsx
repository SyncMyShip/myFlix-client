import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { UserProfile } from "./user-profile";
import { UpdateProfile } from "./update-profile";
import { DeleteUser } from "./delete-user";
import { useNavigate } from "react-router";



export const ProfileView = ({ user, movies, token, syncUser, isFavoriteMovie, handleFavorites }) => {
    const navigate = useNavigate();


    return (
        <Row className="justify-content-center">
            <Col md={10} className="align-items-stretch" style={{ padding: "50px" }}>
                <div>
                    <UserProfile
                        name={user.Name}
                        username={user.Username}
                        email={user.Email}
                        birthday={user.DateOfBirth}
                        favorites={user.FavoriteMovies}
                        movies={movies}
                    />
                </div>

                <div>
                    <UpdateProfile
                        user={user}
                        name={user.Name}
                        username={user.Username}
                        email={user.Email}
                        birthday={user.DateOfBirth}
                        token={token}
                    /> 
                </div>

                <div>
                    <DeleteUser
                        username={user.Username}
                        token={token}
                        onLoggedOut={() => {
                            localStorage.clear();
                            navigate("/login")
                        }}
                    />
                </div>
            </Col>
        </Row>
    );
}