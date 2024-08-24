import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { UserProfile } from "./user-profile";
import { UpdateProfile } from "./update-profile";
import { DeleteUser } from "./delete-user";
import { FavoriteMovies } from "./favorites-view";
import { useNavigate } from "react-router";


export const ProfileView = ({ user, token, movies, isFavoriteMovie, handleFavoritesList }) => {
    const navigate = useNavigate();

    // Update user info in local storage - keep track of user updates
    // const syncUser = (user) => {
    //     localStorage.setItem("user", JSON.stringify(user));
    //     setUser(user);
    // };

    return (
        <Row className="justify-content-center">
            <Col md={10} className="align-items-stretch">
                <div>
                    <UserProfile
                        name={user.Name}
                        username={user.Username}
                        email={user.Email}
                        birthday={user.DateOfBirth}
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
                    <FavoriteMovies
                        key={movies.id}
                        title={movies.Title}
                        user={user}
                        movies={movies}
                        token={token}
                        isFavoriteMovie={isFavoriteMovie}
                        handleFavoritesList={handleFavoritesList}
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