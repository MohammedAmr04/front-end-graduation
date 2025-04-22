import { Container } from "react-bootstrap";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
export default function HeaderProfile() {
  const location = useLocation();

  return (
    <div className="header-profile">
      <Container>
        <div className="container-img ">
          <img src="/src/assets/BooKSwap.jpg" alt="book" className="" />
        </div>
        <div className="user-info">
          <div className="gap-3 d-flex">
            <div className="photo-profile">
              <img src="/src/assets/me.jpg" alt="me" />
            </div>
            <div className="user-details">
              <h3 className="username">John Doe</h3>
            </div>
          </div>
        </div>
        <div className="nav-profile">
          <ul>
            <li
              className={
                location.pathname.endsWith("/posts") ? "active-nav" : ""
              }
            >
              <Link to="posts">Posts</Link>
            </li>

            <li
              className={
                location.pathname.endsWith("/about") ? "active-nav" : ""
              }
            >
              <Link to="about">About</Link>
            </li>
            <li
              className={
                location.pathname.endsWith("/dashboard") ? "active-nav" : ""
              }
            >
              <Link to={"dashboard"}>Dashboard</Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
