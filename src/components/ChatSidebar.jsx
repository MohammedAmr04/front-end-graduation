import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatSidebar = ({ users, selectedUser, onSelectUser, setMessages }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const filteredUsers = users.filter((user) => {
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    return name.toLowerCase().includes(search.toLowerCase());
  });

  async function handleOpenChat(user) {
    onSelectUser(user.id);
    navigate(`/chat/${user.id}`);
    // Fetch messages for the selected user
    try {
      const response = await fetch(
        `https://localhost:7159/api/Chat/messages/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch messages");
      // Optionally, you can process or pass messages here if needed
      // const data = await response.json();
      setMessages(response);
    } catch (err) {
      console.error("Error fetching messages for user:", err);
    }
  }

  return (
    <div className="chat-sidebar-list h-100 d-flex flex-column">
      <div className="p-2 border-bottom bg-light">
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-auto flex-grow-1">
        {filteredUsers.length === 0 && (
          <div className="mt-3 text-center text-muted">No users found</div>
        )}
        {filteredUsers.map((user) => {
          const name =
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            user.userName ||
            "Unknown";
          return (
            <button
              key={user.id}
              className={`list-group-item ps-2 pt-2 list-group-item-action d-flex align-items-center${
                selectedUser === user.id ? " active" : ""
              }`}
              onClick={() => handleOpenChat(user)}
            >
              <img
                src={
                  "https://localhost:7159" + user.profilePicture ||
                  "https://via.placeholder.com/40x40?text=User"
                }
                alt={name}
                className="rounded-circle me-2"
                width={40}
                height={40}
              />
              <div className="flex-grow-1 text-start">
                <div className="fw-bold">{name}</div>
                <div
                  className="text-muted small text-truncate"
                  style={{ maxWidth: 120 }}
                >
                  {/* Optionally show last message here if available */}
                  {user.lastMessage || "No messages yet"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

ChatSidebar.propTypes = {
  users: PropTypes.array.isRequired,
  selectedUser: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  onSelectUser: PropTypes.func.isRequired,
  setMessages: PropTypes.func.isRequired,
};

export default ChatSidebar;
