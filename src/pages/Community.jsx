import Post from "../components/common/community/post/Post";
import SideBar from "../components/common/community/side-bar/SideBar";

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
  return (
    <>
      <SideBar />
      <div className="" style={{ marginLeft: "250px" }}>
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </>
  );
}
