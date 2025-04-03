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
          <div className="buttons-profile ">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-primary">Follow</button>
            <button className="btn btn-primary">Message</button>
          </div>
        </div>
        <div className="nav-profile">
          <ul>
            <li
              className={location.pathname.endsWith("/posts") ? "active" : ""}
            >
              <Link to="posts">Posts</Link>
            </li>

            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Friends</Link>
            </li>
            <li>
              <Link>Dashboard</Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
