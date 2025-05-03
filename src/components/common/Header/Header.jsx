import { Container, Nav, Navbar, Dropdown, Image } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/Auth/authSlice";
import logo from "/src/assets/Group 4.svg";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <>
      <Navbar expand="lg" className="shadow-sm header fixed-top bg-light">
        <Container>
          <Navbar.Brand>
            <Link to="/home">
              <img
                src={logo}
                alt="logo"
                style={{ height: "40px", color: "var(--color-brand)" }}
              />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                as={Link}
                to="/home"
                className={isActive("/home") ? "active" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about-us"
                className={isActive("/about-us") ? "active" : ""}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact-us"
                className={isActive("/contact-us") ? "active" : ""}
              >
                Contact Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/bookSwap"
                className={isActive("/bookSwap") ? "active" : ""}
              >
                Book Swap
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/community"
                className={isActive("/community") ? "active" : ""}
              >
                Community
              </Nav.Link>

              {!isLoggedIn ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Account
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/login">
                      Login
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/register">
                      Sign Up
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" id="dropdown-user">
                    <Image
                      src={user?.avatar || "https://via.placeholder.com/30"}
                      roundedCircle
                      width="30"
                      height="30"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: "70px" }}></div>
    </>
  );
}
