import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from "react-router-dom"
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../state/users/usersSlice';

export const NavigationBar = ({onLoggedOut, moviesSearch, setMoviesSearch}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <Navbar expand="lg" className="ms-auto bg-body-tertiary navbar-static-top">
      <Container>
        <Navbar.Brand as={Link} to="/"><h1>Reel Rendezvous</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to={`/users/${user.Username}`}>Profile</Nav.Link>
                <Nav.Link onClick={() => dispatch(setUser(null))}>Logout</Nav.Link>
              </>
            )}
            {location.pathname === '/' && (
              <Form className="d-flex"> 
                <Form.Control
                    className="me-4"
                    type="search"
                    value={moviesSearch}
                    placeholder="Search for movie"
                    onChange={(e) => setMoviesSearch(e.target.value)}
                />
              </Form>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}