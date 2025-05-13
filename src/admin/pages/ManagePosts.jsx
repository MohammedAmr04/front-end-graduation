import React, { useEffect, useState } from "react";
import axios from "axios";
import './ManagePosts.css';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // fetch posts, communities, and users in parallel
    Promise.all([
      axios.get("http://localhost:5000/posts"),
      axios.get("http://localhost:5000/communities"),
      axios.get("http://localhost:5000/users")
    ])
      .then(([postsRes, communitiesRes, usersRes]) => {
        setPosts(postsRes.data);
        setCommunities(communitiesRes.data);
        setUsers(usersRes.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Utility to get community name by ID
  const getCommunityName = (id) => {
    const community = communities.find(c => +c.id === +id);
    return community ? community.name : "Unknown";
  };

  // Utility to get user name by ID
  const getUserName = (id) => {
    const user = users.find(u => +u.id === +id);
    return user ? user.username || user.name || "User" : "Unknown";
  };

  // Delete handler
  const handleDelete = (postId) => {
    axios.delete(`http://localhost:5000/posts/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch(err => console.error("Error deleting post:", err));
  };

  return (
    <div className="manageposts">
      <h2>Manage Posts</h2>
      <table className="posts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Community</th>
            <th>User</th>
            <th>Content</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{getCommunityName(post.communityId)}</td>
              <td>{getUserName(post.userId)}</td>
              <td>{post.content}</td>
              <td>{post.createdAt}</td>
              <td>
                <button className="delete-post-btn" onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePosts;
