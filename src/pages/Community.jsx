import { useState } from "react";
import Post from "../components/common/community/post/Post";
import SideBar from "../components/common/community/side-bar/SideBar";
import AddPost from "../components/common/community/add-post/AddPost";

const posts = [
  {
    profileImage: "/src/assets/me.jpg", // صورتك الشخصية
    username: "Me",
    timeAgo: "Just now",
    content: "Excited to be working on my new project! 🚀",
    postImage:
      "http://www.mountainphotography.com/images/xl/20100923-Capitol-Sunset.jpg",
  },
  {
    profileImage: "/src/assets/me.jpg", // صورتك الشخصية
    username: "Alice Johnson",
    timeAgo: "30 minutes ago",
    content: "Just finished reading an amazing book! 📖 Highly recommend it.",
    postImage:
      "https://tse4.mm.bing.net/th?id=OIP.IU0dBIT-RUIwj4J94xaXzQHaEm&pid=Api&P=0&h=220",
  },
  {
    profileImage: "/src/assets/me.jpg", // صورتك الشخصية
    username: "John Doe",
    timeAgo: "1 hour ago",
    content: "Had a great time hiking today! The view was breathtaking.",
    postImage:
      "https://tse4.mm.bing.net/th?id=OIP._LFnuIdeVajFLjyF6ZwuOQHaE7&pid=Api&P=0&h=220",
  },
  {
    profileImage: "/src/assets/me.jpg", // صورتك الشخصية
    username: "Emily Carter",
    timeAgo: "2 hours ago",
    content: "Enjoying a cup of coffee on this rainy evening. ☕🌧️",
    postImage:
      "https://tse2.mm.bing.net/th?id=OIP.WkLjIAYIyZCXq0QpfdsQ0QHaHa&pid=Api&P=0&h=220",
  },
  {
    profileImage: "/src/assets/me.jpg", // صورتك الشخصية
    username: "Michael Brown",
    timeAgo: "3 hours ago",
    content: "Coding late at night is the best time for creativity! 💻✨",
    postImage:
      "https://tse3.mm.bing.net/th?id=OIP.t9RxpyYqIqCJFboZho_y7wHaFj&pid=Api&P=0&h=220",
  },
  {
    profileImage: "/src/assets/me.jpg", // صورتك الشخصية
    username: "Sophia Lee",
    timeAgo: "5 hours ago",
    content: "The sunset today was absolutely stunning! 🌅",
    postImage:
      "https://tse2.mm.bing.net/th?id=OIP.WkLjIAYIyZCXq0QpfdsQ0QHaHa&pid=Api&P=0&h=220",
  },
];
export default function Community() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SideBar />
      <div className="" style={{ marginLeft: "250px" }}>
        <div
          className="px-2 pt-3 mx-5 position-relative"
          style={{ width: "600px", height: `${isOpen ? "" : "50px"}` }}
        >
          <button
            type="button"
            className="top-25 btn btn-primary position-absolute rounded-pill  end-0"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            New ➕
          </button>
          {isOpen && (
            <div className="pt-4 mx-auto">
              {/* <Form fields={fields} onSubmit={() => {}} /> */}
              <AddPost />
            </div>
          )}
        </div>
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </>
  );
}
