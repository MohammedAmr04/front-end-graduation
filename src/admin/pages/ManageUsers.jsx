import React, { useState, useEffect } from "react";
import axios from "axios";
import './ManageUsers.css';

const ManageUsers = ()=>{
    const [users, setUsers] =useState([]);


    useEffect(() => {
        axios
          .get("http://localhost:5000/users")
          .then((response) => setUsers(response.data))
          .catch((error) => console.error("Error fetching users:", error));
      }, []);

      // Handle block/unblock user
  const handleBlockToggle = (id, currentStatus) => {
    axios
      .patch(`http://localhost:5000/users/${id}`, { isBlocked: !currentStatus })
      .then(() => {
        setUsers(users.map(user =>
          user.id === id ? { ...user, isBlocked: !currentStatus } : user
        ));
      })
      .catch((error) => console.error("Error toggling block:", error));
  };

// Handle delete user
  const handleDelete = (id) => {
     axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
    };

    return (
        <div className="manageUsers">
          <h2>Manage Users</h2>
          <table className="usersData">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                  <td>
                    <button
                      className={user.isBlocked ? "unblock-btn" : "block-btn"}
                      onClick={() => handleBlockToggle(user.id, user.isBlocked)}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default ManageUsers;