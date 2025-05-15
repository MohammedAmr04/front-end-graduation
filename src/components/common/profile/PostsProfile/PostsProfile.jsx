import { useState } from "react";
import AddPost from "../../community/add-post/AddPost";
import Post from "../../community/post/Post";
import "./styles.css";

const posts = [
  {
    profileImage: "/src/assets/me.jpg",
    username: "Me",
    timeAgo: "Just now",
    content: "Excited to be working on my new project! 🚀",
    postImage:
      "http://www.mountainphotography.com/images/xl/20100923-Capitol-Sunset.jpg",
  },
  {
    profileImage: "/src/assets/me.jpg",
    username: "Alice Johnson",
    timeAgo: "30 minutes ago",
    content: "Just finished reading an amazing book! 📖 Highly recommend it.",
    postImage:
      "https://tse4.mm.bing.net/th?id=OIP.IU0dBIT-RUIwj4J94xaXzQHaEm&pid=Api&P=0&h=220",
  },
];

export default function PostsProfile() {
  const [isOpen, setIsOpen] = useState(false); // Toggle AddPost form

  return (
    <div className="community-content">
      <div className="py-4 container-fluid">
        <div className="mb-4 post-form-container position-relative">
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
          {isOpen && <AddPost />}
        </div>

        <div className="pt-3 mx-auto posts-container row flex-column">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
    //   </div>
  );
}
