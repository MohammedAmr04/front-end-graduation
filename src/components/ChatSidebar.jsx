import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatSidebar = ({ users, selectedUser, onSelectUser }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleOpenChat(user) {
    onSelectUser(user.id); // selectedUser is a string now
    navigate(`/chat/${user.id}`);
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
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            className={`list-group-item list-group-item-action d-flex align-items-center${
              selectedUser === user.id ? " active" : ""
            }`}
            onClick={() => handleOpenChat(user)}
          >
            <img
              src={
                user.profilePic || "https://via.placeholder.com/40x40?text=User"
              }
              alt={user.name}
              className="rounded-circle me-2"
              width={40}
              height={40}
            />
            <div className="flex-grow-1 text-start">
              <div className="fw-bold">{user.name}</div>
              <div
                className="text-muted small text-truncate"
                style={{ maxWidth: 120 }}
              >
                {user.lastMessage || "No messages yet"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

ChatSidebar.propTypes = {
  users: PropTypes.array.isRequired,
  selectedUser: PropTypes.string.isRequired,
  onSelectUser: PropTypes.func.isRequired,
};

export default ChatSidebar;
