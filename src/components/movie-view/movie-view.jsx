import PropTypes from "prop-types";
import "./movie-view.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export const MovieView = ({ user, token, movies }) => {
    const { Title } = useParams();
    const movie = movies.find((m) => m.title === Title);
    let isFavoriteMovie = user.FavoriteMovies
  
    const handleFavorites = async () => {
      const method = isFavoriteMovie ? "DELETE" : "POST";
      const url = `https://reelrendezvous-0ea25cfde7d6.herokuapp.com/users/${user.Username}/movies/${movie.id}`;
  
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          syncUser(data);
  
          const status = isFavoriteMovie ? "removed from" : "added to";
          alert(`Movie ${status} Favorites`);
        } else {
          const errData = await response.json();
  
          console.error("Failed to update Favorites:", errData);
          alert("Failed to update Favorites");
        }
      } catch (err) {
        console.error("Error updating Favorites:", err);
      }
    };

    return (
        <Row className="justify-content-center">
            <Col md={10}>
                {movie && (
                    <Card>
                        <Card.Header className="d-flex justify-content-center">{movie.title}</Card.Header>
                        <Card.Img className="movie-view-img w-100" src={movie.image} />
                        <Card.Body>
                            <Card.Text >Description: {movie.description}</Card.Text>
                            <Card.Text>Director: {movie.director}</Card.Text>
                            <Card.Text>Genre: {movie.genre}</Card.Text>
                            <Button 
                                onClick={handleFavorites}
                                variant={isFavoriteMovie ? "danger" : "primary"}
                            >
                                {isFavoriteMovie ? "Remove from Favorites" : "Add to Favorites"}
                            </Button>
                        </Card.Body>
                        <Link to={"/"}> 
                            <Button className="back-button w-100 justify-content-cener">Back</Button>
                        </Link>
                    </Card>
                )}
            </Col>
        </Row>
    );
};
