import React, { useState } from "react";
import "./AboutMe.css";
import { Pencil, X } from "lucide-react";

const AboutMe = () => {
  const [editMode, setEditMode] = useState(false);

  const [userData, setUserData] = useState({
    name: "Sarah",
    age: 22,
    gender: "Female",
    bio: "I'm passionate about art, tech, and exploring stories through books.",
    hobbies: ["Drawing", "Gaming", "Reading"],
    favoriteBooks: ["Self-development", "Sci-Fi", "Psychology"],
  });

  const [newHobby, setNewHobby] = useState("");
  const [newBook, setNewBook] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setUserData({
        ...userData,
        hobbies: [...userData.hobbies, newHobby.trim()],
      });
      setNewHobby("");
    }
  };

  const handleAddBook = () => {
    if (newBook.trim()) {
      setUserData({
        ...userData,
        favoriteBooks: [...userData.favoriteBooks, newBook.trim()],
      });
      setNewBook("");
    }
  };

  const handleRemoveHobby = (index) => {
    const updated = [...userData.hobbies];
    updated.splice(index, 1);
    setUserData({ ...userData, hobbies: updated });
  };

  const handleRemoveBook = (index) => {
    const updated = [...userData.favoriteBooks];
    updated.splice(index, 1);
    setUserData({ ...userData, favoriteBooks: updated });
  };

  return (
    <div className="about-card">
      <div className="about-header">
        <h2 className="about-title">About {userData.name}</h2>
        <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
          <Pencil size={18} />
        </button>
      </div>

      {editMode ? (
        <>
          <input
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="age"
            type="number"
            value={userData.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <select name="gender" value={userData.gender} onChange={handleChange}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            placeholder="Bio"
          />

          <div className="add-input">
            <input
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              placeholder="Add hobby"
            />
            <button onClick={handleAddHobby}>Add Hobby</button>
          </div>

          <div className="add-input">
            <input
              value={newBook}
              onChange={(e) => setNewBook(e.target.value)}
              placeholder="Add book topic"
            />
            <button onClick={handleAddBook}>Add Book</button>
          </div>
          
        </>
      ) : (
        <>
          <div className="about-info">
            <p>
              <strong>Age:</strong> {userData.age}
            </p>
            {userData.gender !== "Prefer not to say" && (
              <p>
                <strong>Gender:</strong> {userData.gender}
              </p>
            )}
          </div>

          <div className="about-section">
            <h4>Bio</h4>
            <p className="bio">{userData.bio}</p>
          </div>
        </>
      )}

      <div className="about-section">
        <h4>Hobbies</h4>
        <div className="badge-container">
          {userData.hobbies.map((hobby, i) => (
            <span key={i} className="badge">
              {hobby}
              {editMode && (
                <X
                  size={14}
                  className="remove-icon"
                  onClick={() => handleRemoveHobby(i)}
                />
                
              )}
            </span>
          ))}
        </div>
      </div>
      

      <div className="about-section">
        <h4>Favorite Book Topics</h4>
        <div className="badge-container">
          {userData.favoriteBooks.map((book, i) => (
            <span key={i} className="badge">
              {book}
              {editMode && (
                <X
                  size={14}
                  className="remove-icon"
                  onClick={() => handleRemoveBook(i)}
                />
              )}
            </span>
          ))}
        </div>
      </div>
      {editMode && (
  <button className="save-btn" onClick={() => setEditMode(false)}>
    Save Changes
  </button>
)}
    </div>
  );
};

export default AboutMe;
