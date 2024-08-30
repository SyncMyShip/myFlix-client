import { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../state/users/usersSlice";
import { ButtonGroup, CardGroup } from "react-bootstrap";


export const MovieView = ({ syncUser }) => {
    const movies = useSelector((state) => state.movies);
    const { Title } = useParams();
    const movie = movies.find((m) => m.title === Title);
    const { user, token } = useSelector((state) => state.user);
    const [moviesSearch, setMoviesSearch] = useState("");
    const dispatch = useDispatch();

    const isFavoriteMovie = user?.FavoriteMovies?.includes(movie?.id) || false;
  
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

          const updatedUser = await response.json();
          dispatch(setUser(updatedUser));
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
        <Row className="d-flex justify-content-center">
          {movie && (
            <CardGroup>
              <Card className="justify-content-center">
                <Card.Img className="movie-view-img" src={movie.image} />
                <Card.Footer>
                <Button
                        className="d-flex w-100 align-items-center justify-content-center" 
                        onClick={handleFavorites}
                        variant={isFavoriteMovie ? "danger" : "primary"}
                    >
                        {isFavoriteMovie ? "Remove from Favorites" : "Add to Favorites"}
                    </Button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-center"><h2>{movie.title}</h2></Card.Header>
                <Card.Body>
                  <h5>Description:</h5><Card.Text>{movie.description}</Card.Text>
                  <h5>Director:</h5><Card.Text>{movie.director}</Card.Text>
                  <h5>Genre:</h5><Card.Text>{movie.genre}</Card.Text>
                </Card.Body>
                <Card.Footer className="align-items-center">
                    <Link to={"/"}> 
                        <Button className="w-100 justify-content-center text-white d-flex bg-dark back-button card-footer text-primary">Back</Button>
                    </Link>
                  </Card.Footer>
              </Card>
            </CardGroup>  
          )}
        </Row>
    );
};