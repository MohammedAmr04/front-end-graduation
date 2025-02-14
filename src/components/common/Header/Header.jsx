import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <>
      <Navbar expand="lg" className="shadow-sm header fixed-top bg-light">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            Ktabook
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/home"
                className={location.pathname === "/home" ? "active" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about-us"
                className={location.pathname === "/about-us" ? "active" : ""}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact-us"
                className={location.pathname === "/contact-us" ? "active" : ""}
              >
                Contact Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/community"
                className={location.pathname === "/community" ? "active" : ""}
              >
                Community
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                className={location.pathname === "/login" ? "active" : ""}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className={location.pathname === "/register" ? "active" : ""}
              >
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: "58px" }}></div>
    </>
  );
}
