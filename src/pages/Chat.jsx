import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import ChatSidebar from "../components/ChatSidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import "../styles/Chat.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const HUB_URL = "https://localhost:7159/chatHub";

const Chat = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState([
    {
      id: "19cd2c81-b051-4a2d-84b6-6d8b53c865df",
      firstName: "mahmoud",
      lastName: "talaat",
      userName: "talaat",
      email: "talaat@gmail.com",
      gender: "male",
      age: null,
      profilePicture:
        "/profile-photos/471306b0-4fc3-414d-9aa1-78b33cefeec5.jpeg",
    },
  ]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(userId || null);
  const [connection, setConnection] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      try {
        const response = await fetch(
          `https://localhost:7159/api/Chat/messages/${selectedUser}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        // Map API response to consistent message structure
        const formattedMessages = data.map((msg, index) => ({
          id: msg.id || index + 1,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          text: msg.message,
          senderName:
            msg.sender && msg.sender.firstName && msg.sender.lastName
              ? `${msg.sender.firstName} ${msg.sender.lastName}`
              : undefined,
          receiverName:
            msg.receiver && msg.receiver.firstName && msg.receiver.lastName
              ? `${msg.receiver.firstName} ${msg.receiver.lastName}`
              : undefined,
          isRead: msg.isRead,
          timestamp:
            msg.createdAt &&
            new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
        }));

        setMessages(formattedMessages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [selectedUser, token]);

  // Setup SignalR connection
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [token]);

  // Start connection and listen
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (senderId, message) => {
            setMessages((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                senderId,
                receiverId: userId,
                text: message,
              },
            ]);
          });
        })
        .catch((e) => console.error("SignalR Connection failed: ", e));
    }

    return () => {
      if (connection) connection.stop();
    };
  }, [connection, users, userId]);

  // Fetch users
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("https://localhost:7159/api/Chat/users", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (!response.ok) throw new Error("Failed to fetch users");
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (err) {
  //       console.error("Error fetching users:", err);
  //     }
  //   };
  //   fetchUsers();
  // }, [token]);

  // Helper to get current user's name
  function getCurrentUserName(users, userId) {
    const user = users.find((u) => String(u.id) === String(userId));
    return user ? user.name : "You";
  }

  // Send message via SignalR + API
  const handleSendMessage = async (text) => {
    if (!text.trim() || !connection) return;
    try {
      await connection.invoke("SendMessage", selectedUser, text);

      // await fetch(API_SEND_URL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({ receiverId: selectedUser, message: text }),
      // });

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          senderId: userId,
          receiverId: selectedUser,
          senderName: getCurrentUserName(users, userId),
          text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  return (
    <div className="container-fluid chat-page">
      <div className="row h-100">
        {/* Sidebar */}
        <div
          className="p-0 col-12 col-md-3 border-end chat-sidebar"
          style={{
            background: "#fff",
            boxShadow: "2px 0 8px rgba(0,0,0,0.03)",
            zIndex: 2,
          }}
        >
          <ChatSidebar
            users={users}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
            setMessages={setMessages}
          />
        </div>
        {/* Main Chat Area */}
        <div
          className="p-0 col-12 col-md-9 d-flex flex-column chat-main"
          style={{
            background: "var(--color-bg-beige)",
            borderRadius: "0 18px 18px 0",
            boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 d-flex align-items-center border-bottom"
            style={{
              background: "#fff",
              borderTopRightRadius: 18,
            }}
          >
            <img
              src={
                users.find((u) => u.id === selectedUser)?.profilePicture
                  ? "https://localhost:7159" +
                    users.find((u) => u.id === selectedUser)?.profilePicture
                  : "/assets/user.png"
              }
              alt="User"
              width={44}
              height={44}
              className="border rounded-circle me-3"
              style={{
                objectFit: "cover",
                background: "#f5f2e9",
              }}
            />
            <div>
              <div
                className="fw-bold"
                style={{
                  fontSize: 18,
                  color: "var(--color-brand)",
                }}
              >
                {users.find((u) => u.id === selectedUser)
                  ? `${users.find((u) => u.id === selectedUser).firstName} ${
                      users.find((u) => u.id === selectedUser).lastName
                    }`
                  : "Select a user"}
              </div>
              <div className="small text-muted">
                {users.find((u) => u.id === selectedUser)?.email || ""}
              </div>
            </div>
          </div>
          {/* Messages + Input */}
          <div className="flex-grow-1 d-flex flex-column">
            {selectedUser ? (
              <>
                <div
                  className="overflow-auto flex-grow-1 chat-messages-area"
                  style={{
                    background: "var(--color-bg-beige)",
                  }}
                >
                  <ChatMessages messages={messages} userId={userId} />
                </div>
                <div
                  className="p-2 chat-input-area border-top"
                  style={{
                    background: "#fff",
                    borderBottomRightRadius: 18,
                  }}
                >
                  <ChatInput onSend={handleSendMessage} />
                </div>
              </>
            ) : (
              <div
                className="flex-grow-1 d-flex align-items-center justify-content-center text-muted"
                style={{ fontSize: 20 }}
              >
                Start chat with your friends
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
