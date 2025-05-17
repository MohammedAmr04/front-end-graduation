import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import ChatSidebar from "../components/ChatSidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import "../styles/Chat.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const HUB_URL = "https://localhost:7159/chatHub";
const API_SEND_URL = "https://localhost:7159/api/Chat/send";

const Chat = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(userId || null);
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      setLoading(true);
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
        console.log("📩 Messages from API:", data);

        const formattedMessages = data.map((msg, index) => ({
          id: index + 1,
          receiverId: msg.receiverId,
          text: msg.message,
        }));

        setMessages(formattedMessages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
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
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://localhost:7159/api/Chat/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [token]);

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

      await fetch(API_SEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId: selectedUser, message: text }),
      });

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
        <div className="p-0 col-12 col-md-3 border-end chat-sidebar">
          <ChatSidebar
            users={users}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        </div>
        <div className="p-0 col-12 col-md-9 d-flex flex-column chat-main">
          <div className="overflow-auto flex-grow-1 chat-messages-area">
            <ChatMessages
              messages={messages}
              loading={loading}
              userId={userId}
            />
          </div>
          <div className="p-2 chat-input-area border-top">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
