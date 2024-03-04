import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
    const aStyle={
        color: "black",
        textDecoration: "none",
        padding: "10px"
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link to="/" style={aStyle}>BCA News</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link style={aStyle} to="/">Home</Link>
                        <Link style={aStyle} to="/about">About us</Link>
                        <Link style={aStyle} to="/news">News</Link>
                        <Link style={aStyle} to="/contact">Contact</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;