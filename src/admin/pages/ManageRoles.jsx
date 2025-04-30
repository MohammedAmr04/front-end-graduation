import React, { useState, useEffect } from "react";
import axios from "axios";
import './ManageRoles.css';

const ManageRoles = () => {
  const [users, setUsers] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    // Get users
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    // Get communities
    axios
      .get("http://localhost:5000/communities")
      .then((response) => setCommunities(response.data))
      .catch((error) => console.error("Error fetching communities:", error));
  }, []);

  const handleRoleChange = (id, newRole) => {
    const userToUpdate = users.find((user) => user.id === id);
  
    if (!userToUpdate) return; 
  
    const updatedUser = {
      ...userToUpdate,
      role: newRole,
      communityId: newRole === "user" ? null : userToUpdate.communityId,
    };
  
    axios
      .put(`http://localhost:5000/users/${id}`, updatedUser)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === id ? updatedUser : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => console.error("Error updating role:", error));
  };
  

  const handleCommunityChange = (id, communityId) => {
    const userToUpdate = users.find((user) => user.id === id);
  
    if (!userToUpdate) return;
  
    const updatedUser = {
      ...userToUpdate,
      communityId: parseInt(communityId),
    };
  
    axios
      .put(`http://localhost:5000/users/${id}`, updatedUser)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === id ? updatedUser : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => console.error("Error updating community:", error));
  };
  
  return (
    <div className="manageRoles">
      <h2>Manage Roles</h2>
      <table className="rolesTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
            <th>Community</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="role-btn"
                  onClick={() =>
                    handleRoleChange(user.id, user.role === "user" ? "moderator" : "user")
                  }
                >
                  {user.role === "user" ? "Make moderator" : "Make User"}
                </button>
              </td>
              <td>
                {user.role === "moderator" ? (
                  <select
                    value={user.communityId || ""}
                    onChange={(e) => handleCommunityChange(user.id, e.target.value)}
                  >
                    <option value="">Select Community</option>
                    {communities.map((community) => (
                      <option key={community.id} value={community.id}>
                        {community.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  "______________________"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoles;
