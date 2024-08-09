import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user }) => {

    useEffect(() => {
        if (!token) return;
        const { userProfile } = useParams();
        const users = user.find((u) => u.Username === userProfile);
    
        fetch("https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((users) => {
            const moviesFromApi = users.map((user) => {
              return {
                name: movie.Name,
                username: movie.Username,
                description: movie.Description,
                genre: movie.Genre["Name"],
                director: movie.Director["Name"]
              };  
            });
            setMovies(moviesFromApi);
          })
      }, [token]);


      return (
        <Row className="justify-content-center">
            <Col md={10}>
                <Card>
                    <Card.Header className="d-flex justify-content-center">{movie.title}</Card.Header>
                    <Card.Img className="movie-view-img" style={{ width: "50%", height: "75%", border: "2px solid black"}}src={movie.image} />
                    <Card.Body>
                    <Card.Text >Description: {movie.description}</Card.Text>
                        <Card.Text>Director: {movie.director}</Card.Text>
                        <Card.Text>Genre: {movie.genre}</Card.Text>
                     </Card.Body>
                     <Link to={"/"}> 
                        <Button className="back-button w-50 justify-content-cener">Back</Button>
                    </Link>
                </Card>
            </Col>
        </Row>
    );
};


MovieView.propTypes = {
    movies: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string,
        director: PropTypes.string,
    }).isRequired,
};