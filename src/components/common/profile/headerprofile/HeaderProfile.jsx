import { Container, Button } from "react-bootstrap";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import { Camera } from "react-bootstrap-icons";

export default function HeaderProfile() {
  const location = useLocation();

  const handleCoverImageChange = (e) => {
    // Handle cover image change
    const file = e.target.files[0];
    if (file) {
      // Add your image upload logic here
      console.log("Cover image changed:", file);
    }
  };

  const handleProfileImageChange = (e) => {
    // Handle profile image change
    const file = e.target.files[0];
    if (file) {
      // Add your image upload logic here
      console.log("Profile image changed:", file);
    }
  };

  return (
    <div className="header-profile">
      <Container>
        <div className="container-img position-relative">
          <img src="/src/assets/BooKSwap.jpg" alt="book" className="w-100" />
          <div className="cover-image-overlay">
            <label htmlFor="cover-image-input" className="cover-image-button">
              <Camera size={20} />
              <span>Change Cover</span>
            </label>
            <input
              type="file"
              id="cover-image-input"
              accept="image/*"
              onChange={handleCoverImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="user-info">
          <div className="gap-3 d-flex">
            <div className="photo-profile position-relative">
              <img src="/src/assets/me.jpg" alt="me" />
              <div className="profile-image-overlay">
                <label
                  htmlFor="profile-image-input"
                  className="profile-image-button"
                >
                  <Camera size={16} />
                </label>
                <input
                  type="file"
                  id="profile-image-input"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  style={{ display: "none" }}
                />
              </div>
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
