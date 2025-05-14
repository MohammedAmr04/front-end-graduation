import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faIdCardClip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import {
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiChevronLeft,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

import "./styles.css";

export default function SideBar() {
  const [show, setShow] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/home", icon: <FiHome className="me-2" />, label: "Home" },
    {
      path: "/about-us",
      icon: <FontAwesomeIcon icon={faAddressCard} className="me-2" />,
      label: "About Us",
    },
    {
      path: "/contact-us",
      icon: <FontAwesomeIcon icon={faIdCardClip} className="me-2" />,
      label: "Contact Us",
    },
    { path: "/login", icon: <FiLogIn className="me-2" />, label: "Login" },
    {
      path: "/register",
      icon: <FiUserPlus className="me-2" />,
      label: "Register",
    },
  ];

  return (
    <div>
      {/* Mobile Menu Toggle Button */}
      <button
        className="mobile-menu-btn d-lg-none"
        onClick={() => setShow(true)}
        aria-label="Toggle menu"
      >
        <FiMenu size={24} />
      </button>

      {/* Desktop Sidebar */}
      <div
        className={`pt-3 bg-white shadow-lg desktop-sidebar d-none d-lg-flex flex-column vh-100 position-fixed ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        <div className="px-3 mb-3 d-flex justify-content-end">
          <button
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <FiChevronLeft className={`${isCollapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
        <Nav className="flex-column">
          {menuItems.map((item) => (
            <Nav
              key={item.path}
              as={Link}
              to={item.path}
              className={`px-3 py-3 sideBarItem d-flex align-items-center border-bottom border-1 text-decoration-none ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="icon">{item.icon}</span>
              <span className={`menu-text ${isCollapsed ? "d-none" : ""}`}>
                {item.label}
              </span>
            </Nav>
          ))}
        </Nav>
      </div>

      {/* Main Content Wrapper */}
      <div className={`main-content ${isCollapsed ? "expanded" : ""}`}>
        {/* Mobile Sidebar */}
        <Offcanvas
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          className="mobile-sidebar"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {menuItems.map((item) => (
                <Nav
                  key={item.path}
                  as={Link}
                  to={item.path}
                  className={`px-3 py-3 sideBarItem d-flex align-items-center text-decoration-none ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={() => setShow(false)}
                >
                  {item.icon}
                  <span className="menu-text">{item.label}</span>
                </Nav>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}
