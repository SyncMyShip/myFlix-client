import PropTypes from "prop-types";
import "./movie-view.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";



export const MovieView = ({ movies }) => {
    const { Title } = useParams();

    const movie = movies.find((m) => m.title === Title);

    return (
        <Row className="justify-content-center">
            <Col md={10}>
                <Card>
                    <Card.Header className="d-flex justify-content-center">{movie.title}</Card.Header>
                    <Card.Img className="movie-view-img w-100" src={movie.image} />
                    <Card.Body>
                    <Card.Text >Description: {movie.description}</Card.Text>
                        <Card.Text>Director: {movie.director}</Card.Text>
                        <Card.Text>Genre: {movie.genre}</Card.Text>
                     </Card.Body>
                     <Link to={"/"}> 
                        <Button className="back-button w-100 justify-content-cener">Back</Button>
                    </Link>
                </Card>
            </Col>
        </Row>
    );
};


MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string,
        director: PropTypes.string,
    }).isRequired,
};