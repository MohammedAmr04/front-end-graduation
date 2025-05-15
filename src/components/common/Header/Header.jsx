import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/Auth/authSlice";
import logo from "/src/assets/Group 4.svg";
import { FaUserCircle } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState([]); // Store notification messages
  const [showDropdown, setShowDropdown] = useState(false);
  const connectionRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) return;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7159/notificationHub", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNotification", (message) => {
      setHasNotification(true);
      setNotifications((prev) => [message, ...prev]); // Add new message to notifications
    });

    connection
      .start()
      .catch((err) => console.error("SignalR Connection Error:", err));
    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [isLoggedIn, token]);

  const handleNotificationClick = () => {
    setHasNotification(false);
    setShowDropdown((prev) => !prev); // Toggle dropdown
  };

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

              {isLoggedIn && (
                <Nav.Item style={{ position: "relative", marginRight: "10px" }}>
                  <span style={{ position: "relative" }}>
                    <FiBell
                      size={22}
                      style={{ cursor: "pointer" }}
                      onClick={handleNotificationClick}
                    />
                    {hasNotification && (
                      <span
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          width: 10,
                          height: 10,
                          background: "#ff4444",
                          borderRadius: "50%",
                          border: "2px solid #fff",
                          zIndex: 2,
                        }}
                      ></span>
                    )}
                  </span>
                  {showDropdown && notifications.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 30,
                        minWidth: 250,
                        background: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        borderRadius: 8,
                        zIndex: 1000,
                        padding: 0,
                        maxHeight: 300,
                        overflowY: "auto",
                      }}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <div
                        style={{
                          padding: "10px 16px",
                          borderBottom: "1px solid #eee",
                          fontWeight: 600,
                        }}
                      >
                        Notifications
                      </div>
                      {notifications.map((msg, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: "10px 16px",
                            borderBottom: "1px solid #f5f5f5",
                            fontSize: 14,
                          }}
                        >
                          {msg}
                        </div>
                      ))}
                    </div>
                  )}
                </Nav.Item>
              )}

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
                    <FaUserCircle size={24} /> {/* 👤 أيقونة المستخدم */}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/profile")}>
                      Profile
                    </Dropdown.Item>
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
