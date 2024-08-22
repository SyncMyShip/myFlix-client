import PropTypes from "prop-types";
import "./movie-view.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";



export const MovieView = ({ movie, onBackClick }) => {
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
                     <Card.Body className="d-flex justify-content-center">   
                        <Button className="back-button w-50" onClick={onBackClick}>Back</Button>
                    </Card.Body>
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
    onBackClick: PropTypes.func.isRequired
};