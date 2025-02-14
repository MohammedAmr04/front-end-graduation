import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faIdCardClip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { FiHome, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";
export default function SideBar() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div
        className="pt-3 shadow-lg d-none d-lg-flex flex-column vh-100 position-fixed"
        style={{ width: "250px" }}
      >
        <Nav className="flex-column">
          <Nav
            as={Link}
            to={"/home"}
            className="px-3 py-3 border-black sideBarItem d-flex align-items-center border-bottom border-1"
          >
            <FiHome className="me-2" /> Home
          </Nav>
          <Nav
            as={Link}
            to={"/about-us"}
            className="px-3 py-3 border-black sideBarItem d-flex align-items-center border-bottom border-1"
          >
            <FontAwesomeIcon icon={faAddressCard} className="me-2" /> About Us
          </Nav>

          <Nav
            as={Link}
            to={"/contact-us"}
            className="px-3 py-3 border-black sideBarItem d-flex align-items-center border-bottom border-1"
          >
            <FontAwesomeIcon icon={faIdCardClip} className="me-2" />
            Contact Us
          </Nav>
          <Nav
            as={Link}
            to={"/login"}
            className="px-3 py-3 border-black sideBarItem d-flex align-items-center border-bottom border-1"
          >
            <FontAwesomeIcon icon={faAddressCard} className="me-2" /> Login
          </Nav>
          <Nav
            as={Link}
            to={"/register"}
            className="px-3 py-3 border-black sideBarItem d-flex align-items-center border-bottom border-1"
          >
            <FontAwesomeIcon icon={faAddressCard} className="me-2" /> Register
          </Nav>
        </Nav>
      </div>

      <div className="d-flex" style={{ marginLeft: "250px" }}>
        <Offcanvas show={show} onHide={() => setShow(false)} backdrop="static">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link href="#" className="d-flex align-items-center">
                <FiHome className="me-2" /> Home
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center">
                <FiUser className="me-2" /> Profile
              </Nav.Link>

              <Nav.Link href="#" className="d-flex align-items-center">
                <FiUser className="me-2" /> About Us
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center">
                <FiUser className="me-2" /> Contact Us
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}
