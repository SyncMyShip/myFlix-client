import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserProfile } from "./user-profile";
import { UpdateProfile, FavoritesView } from "./update-profile";


export const ProfileView = ({ user, storedToken, updatedUser }) => {


    return (
        <Row className="justify-content-center">
            <Col className="col-md-12 d-flex align-items-stretch">
                <Card className="mb-3">
                    <Card.Header className="d-flex justify-content-center">
                        <UserProfile
                            name={user.Name}
                            username={user.Username}
                            email={user.Email}
                        />
                    </Card.Header>
                    <Card.Body>
                        <UpdateProfile
                            user={user}
                            storedToken={storedToken}
                            updatedUser={updatedUser}
                        /> 
                     </Card.Body>
                     <Card.Body>

                     </Card.Body>
                     <Link to={"/"}> 
                        <Button className="back-button w-100 justify-content-cener">Back</Button>
                    </Link>
                </Card>
            </Col>
        </Row>
    );
}