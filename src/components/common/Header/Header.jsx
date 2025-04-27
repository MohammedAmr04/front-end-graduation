import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // Check if current path is inside admin pages
  const isAdmin = location.pathname.startsWith("/admin");

  // If it's admin page, don't render the Header
  if (isAdmin) {
    return null;
  }

  return (
    <>
      <Navbar expand="lg" className="shadow-sm header fixed-top bg-light">
        <Container>
          <Navbar.Brand>
            {!isAdmin ? (
              <Link to="/home">
                <img
                  src="/src/assets/Group 4.svg"
                  alt="logo"
                  style={{ height: "40px", color: "var(--color-brand)" }}
                />
              </Link>
            ) : (
              <img
                src="/src/assets/Group 4.svg"
                alt="logo"
                style={{ height: "40px", color: "var(--color-brand)" }}
              />
            )}
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
                to="/bookSwap"
                className={location.pathname === "/bookSwap" ? "active" : ""}
              >
                Book Swap
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

      <div style={{ paddingTop: "66px" }}></div>
    </>
  );
}

