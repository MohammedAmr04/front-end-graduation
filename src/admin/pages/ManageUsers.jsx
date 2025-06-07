import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { useToast } from "../../hooks/useToast";
import "./ManageUsers.css";

const API_URL = "https://localhost:7159/api/Admin/users";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editRoleUserId, setEditRoleUserId] = useState(null);
  const [newRole, setNewRole] = useState("");
  const token = useSelector((state) => state.auth.token);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (!token) return;
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => {
        showError("Error fetching users", "error");
        console.error("Error fetching users:", error);
      });
  }, [token]);

  // Handle block/unblock user
  const handleBlockToggle = (id, currentStatus) => {
    axios
      .patch(
        `${API_URL}/${id}`,
        { isBlocked: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, isBlocked: !currentStatus } : user
          )
        );
        showSuccess(
          `User ${!currentStatus ? "blocked" : "unblocked"} successfully`
        );
      })
      .catch((error) => {
        showError("Error toggling block", "error");
        console.error("Error toggling block:", error);
      });
  };

  // Handle delete user
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));

        showSuccess("User deleted successfully");
      })
      .catch((error) => {
        showError("Error deleting user", "error");
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="manageUsers" style={{ padding: "40px 0" }}>
      <h2 style={{ textAlign: "center", marginBottom: 32 }}>Manage Users</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              padding: "32px 28px 24px 28px",
              width: "320px",
              minHeight: "260px",
              marginBottom: "24px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1.5px solid #e0e7ff",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            className="user-card"
          >
            <div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 8,
                }}
              >
                {user.username}
              </h3>
              <p style={{ color: "#475569", marginBottom: 8 }}>
                <strong>Email:</strong> {user.email}
              </p>
              <div style={{ fontSize: 15, color: "#64748b", marginBottom: 8 }}>
                <span style={{ marginRight: 12 }}>
                  <strong>Role:</strong> {user.role}
                  <FiEdit2
                    style={{
                      width: 18,
                      height: 18,
                      marginLeft: 8,
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                    title="Edit Role"
                    onClick={() => {
                      setEditRoleUserId(user.id);
                      setNewRole(user.role);
                    }}
                  />
                </span>
                {user.communityId && (
                  <span>
                    <strong>Community:</strong> {user.communityId}
                  </span>
                )}
              </div>
              {editRoleUserId === user.id && (
                <div style={{ marginBottom: 8, marginTop: 4 }}>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: "1px solid #e0e7ff",
                      marginRight: 8,
                    }}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Sender">Sender</option>
                    <option value="Receiver">Receiver</option>
                    <option value="User">User</option>
                  </select>
                  <button
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      fontWeight: 600,
                      marginRight: 4,
                    }}
                    onClick={async () => {
                      try {
                        await axios.put(
                          `${API_URL}/${user.id}/roles`,
                          { newRole },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        setUsers(
                          users.map((u) =>
                            u.id === user.id ? { ...u, role: newRole } : u
                          )
                        );
                        setEditRoleUserId(null);
                        showSuccess("Role updated successfully", "success");
                      } catch {
                        showError("Failed to update role", "error");
                      }
                    }}
                  >
                    Save
                  </button>
                  <button
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "#e0e7ff",
                      color: "#334155",
                      border: "none",
                      fontWeight: 600,
                    }}
                    onClick={() => setEditRoleUserId(null)}
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div style={{ marginBottom: 8 }}>
                <span
                  style={{
                    background: user.isBlocked ? "#fecaca" : "#bbf7d0",
                    color: user.isBlocked ? "#b91c1c" : "#166534",
                    borderRadius: 8,
                    padding: "4px 12px",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>
            </div>
            <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
              <button
                className={user.isBlocked ? "unblock-btn" : "block-btn"}
                style={{ flex: 1, fontWeight: 600, fontSize: 15 }}
                onClick={() => handleBlockToggle(user.id, user.isBlocked)}
              >
                {user.isBlocked ? "Unblock" : "Block"}
              </button>
              <button
                className="delete-btn"
                style={{ flex: 1, fontWeight: 600, fontSize: 15 }}
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
