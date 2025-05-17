import PropTypes from "prop-types";
import Loader from "./common/loader/Loader";

const ChatMessages = ({ messages, loading, userId }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-3">
      {messages.map((msg) => {
        const isOwn = msg.senderId === userId;
        return (
          <div
            key={msg.id}
            className={`mb-3 d-flex flex-column ${
              isOwn ? "align-items-end" : "align-items-start"
            }`}
          >
            <div
              className={`rounded p-2 shadow-sm chat-bubble ${
                isOwn ? "bg-primary text-white" : "bg-light"
              }`}
              style={{ maxWidth: "75%" }}
            >
              <div
                className={`fw-bold small ${
                  isOwn ? "text-white-50" : "text-primary"
                }`}
              >
                {msg.senderName}
              </div>
              <div>{msg.text}</div>
              <div
                className={`text-muted small text-end mt-1 ${
                  isOwn ? "text-white-50" : ""
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ChatMessages;
