import { useState } from "react";
import AddPost from "../../community/add-post/AddPost";
import Post from "../../community/post/Post";
import "./styles.css";
import { useOutletContext } from "react-router-dom";

export default function PostsProfile() {
  const [isOpen, setIsOpen] = useState(false); // Toggle AddPost form
  const { profile, me } = useOutletContext();
  const { posts } = profile;
  return (
    <div className="community-content">
      <div className="py-2 container-fluid">
        {/* <div className="mb-4 post-form-container position-relative"></div> */}

        <div className="mx-auto  posts-container row flex-column position-relative">
          {me && (
            <button
              type="button"
              className={`btn btn-primary rounded-pill new-post-btn ${
                isOpen ? "active rotate" : ""
              }`}
              onClick={() => setIsOpen((prev) => !prev)}
              style={{ width: "fit-content" }}
            >
              New ➕
            </button>
          )}
          {isOpen && <AddPost />}
          <div className={isOpen ? "" : "pt-5"}>
            {posts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
    //   </div>
  );
}
