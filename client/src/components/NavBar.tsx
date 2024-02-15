import { Container, Navbar, Nav } from "react-bootstrap"
import { User } from "../models/user"
import NavBarLogIn from "./NavBarLoggedIn"
import NavBarLogOut from "./NavBarLoggedOut"
import { Link } from "react-router-dom"

interface NavBarProps {
    loggedInUser: User | null,
    onSignupClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({loggedInUser, onSignupClicked, onLoginClicked, onLogoutSuccessful}: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Cool Notes App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        { loggedInUser
                        ? <NavBarLogIn user={loggedInUser} onLogoutSuccesful={onLogoutSuccessful} />
                        : <NavBarLogOut onLoginClicked={onLoginClicked} onSignupClicked={onSignupClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar