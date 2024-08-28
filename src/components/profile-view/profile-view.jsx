import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { UserProfile } from "./user-profile";
import { UpdateProfile } from "./update-profile";
import { DeleteUser } from "./delete-user";
import { FavoriteMovies } from "./favorites-view";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";


export const ProfileView = ({ user, movies, token, syncUser, isFavoriteMovie, handleFavorites }) => {
    const navigate = useNavigate();
    // const user = JSON.parse(localStorage.getItem("user"));
    // const movies = useSelector((state) => state.movies)


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
                        syncUser={syncUser}
                    /> 
                </div>
                {/* <div>
                    <FavoriteMovies
                        user={user}
                        movies={movies}
                        // title={movies.Title}
                        token={token}
                        isFavoriteMovie={isFavoriteMovie}
                        handleFavorites={handleFavorites}
                    />
                </div> */}

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