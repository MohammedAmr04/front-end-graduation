import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/Auth/authSlice";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
            <Nav className="ms-auto align-items-center">
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

              {!isLoggedIn ? (
                <>
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
                    className={
                      location.pathname === "/register" ? "active" : ""
                    }
                  >
                    Sign Up
                  </Nav.Link>
                </>
              ) : (
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: "70px" }}></div>
    </>
  );
}

