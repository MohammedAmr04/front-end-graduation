import { useRef, useState } from "react";
import AddPost from "../../community/add-post/AddPost";
import Post from "../../community/post/Post";
import "./styles.css";

const posts = [
  {
    profileImage: "/src/assets/me.jpg",
    username: "Me",
    timeAgo: "Just now",
    content: "Excited to be working on my new project! 🚀",
    postImage:
      "http://www.mountainphotography.com/images/xl/20100923-Capitol-Sunset.jpg",
  },
  {
    profileImage: "/src/assets/me.jpg",
    username: "Alice Johnson",
    timeAgo: "30 minutes ago",
    content: "Just finished reading an amazing book! 📖 Highly recommend it.",
    postImage:
      "https://tse4.mm.bing.net/th?id=OIP.IU0dBIT-RUIwj4J94xaXzQHaEm&pid=Api&P=0&h=220",
  },
];

export default function PostsProfile() {
  const [isOpen, setIsOpen] = useState(false); // Toggle AddPost form
  // const [isEditing, setIsEditing] = useState(false); // Toggle editing bio
  // const [hoppies, setHoppies] = useState([]); // List of hobbies
  // const [hoppy, setHoppy] = useState(""); // New hobby input value
  // const [editableHobbies, setEditableHobbies] = useState([]); // Editable state for each hobby

  // const [bio, setBio] = useState(
  //   "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
  // ); // User bio
  // const [error, setError] = useState(""); // Error for bio length
  // const [hoppyError, setHoppyError] = useState(""); // Error for hobbies
  // const inputRefs = useRef([]); // Refs for hobbies inputs
  // const bioRef = useRef(null); // Ref for bio input

  // // Handle adding new hobby
  // const handleNewHoppy = () => {
  //   if (!hoppy.trim()) {
  //     setHoppyError("Hobby cannot be empty.");
  //     return;
  //   }

  //   if (hoppies.length >= 5) {
  //     setHoppyError("You can only add up to 5 hobbies.");
  //     return;
  //   }

  //   if (hoppies.includes(hoppy.trim())) {
  //     setHoppyError("This hobby is already added.");
  //     return;
  //   }

  //   setHoppies([...hoppies, hoppy]);
  //   setEditableHobbies([...editableHobbies, false]); // each new hobby is not editable by default
  //   setHoppy("");
  //   setHoppyError(""); // Clear any previous errors
  // };

  // // Handle editing bio
  // const handleEditClick = () => {
  //   if (isEditing) {
  //     if (bio.length > 70) {
  //       setError("Bio must be less than 70 characters.");
  //       return;
  //     }
  //     setError("");
  //   }
  //   setIsEditing(!isEditing);
  //   if (!isEditing) {
  //     // Focus on bio textarea when editing starts
  //     bioRef.current?.focus();
  //   }
  // };

  // // Handle editing hobby
  // const handleEditHobby = (index) => {
  //   const updated = [...editableHobbies];
  //   updated[index] = true;
  //   setEditableHobbies(updated);

  //   setTimeout(() => {
  //     inputRefs.current[index]?.focus(); // focus the input after making it editable
  //   }, 0);
  // };

  // // Handle saving hobby
  // const handleSaveHobby = (index) => {
  //   const updatedHobby = hoppies[index].trim();
  //   if (!updatedHobby) {
  //     setHoppyError("Hobby cannot be empty.");
  //     return;
  //   }

  //   if (hoppies.some((hobby, i) => hobby === updatedHobby && i !== index)) {
  //     setHoppyError("This hobby already exists.");
  //     return;
  //   }

  //   const updated = [...editableHobbies];
  //   updated[index] = false;
  //   setEditableHobbies(updated);
  //   setHoppyError("");
  // };

  // // Handle hobby change
  // const handleHobbyChange = (value, index) => {
  //   const updated = [...hoppies];
  //   updated[index] = value;
  //   setHoppies(updated);
  // };

  return (
    // <div className="gap-5 py-4 posts-profile d-flex justify-content-evenly">
    //   <div className="mt-4 user-info">
    //     <strong>Intro</strong>
    //     <div className="my-2 bio">
    //       <textarea
    //         className="h-auto form-control"
    //         style={{ resize: "none" }}
    //         readOnly={!isEditing}
    //         maxLength={70}
    //         value={bio}
    //         onChange={(e) => setBio(e.target.value)}
    //         ref={bioRef}
    //         placeholder="Tell us about yourself..."
    //       />
    //       {isEditing && (
    //         <small className={bio.length > 70 ? "text-danger" : "text-success"}>
    //           {bio.length} / 70 characters
    //         </small>
    //       )}
    //       {error && <p className="mt-1 text-danger">{error}</p>}
    //       <button
    //         className="mt-2 btn btn-secondary w-100"
    //         onClick={handleEditClick}
    //       >
    //         {isEditing ? "Save" : "Edit bio"}
    //       </button>
    //     </div>

    //     <div className="details">
    //       <strong>Hobbies</strong>
    //       <input
    //         type="text"
    //         placeholder="Tell me about your hobbies"
    //         value={hoppy}
    //         onChange={(e) => setHoppy(e.target.value)}
    //         className="my-2 form-control"
    //       />
    //       <button className="btn btn-secondary" onClick={handleNewHoppy}>
    //         Add Hobby
    //       </button>

    //       {hoppyError && <p className="mt-1 text-danger">{hoppyError}</p>}

    //       <ul className="mt-2 list-group">
    //         {hoppies.map((hoppy, index) => (
    //           <li key={index} className="gap-2 my-1 d-flex align-items-center">
    //             <input
    //               type="text"
    //               className={`form-control ${
    //                 !editableHobbies[index] && "input-hoppy"
    //               }`}
    //               value={hoppy}
    //               readOnly={!editableHobbies[index]}
    //               ref={(el) => (inputRefs.current[index] = el)}
    //               onChange={(e) => handleHobbyChange(e.target.value, index)}
    //             />
    //             {editableHobbies[index] ? (
    //               <button
    //                 className="btn btn-sm btn-success"
    //                 onClick={() => handleSaveHobby(index)}
    //               >
    //                 Save
    //               </button>
    //             ) : (
    //               <button
    //                 className="btn btn-sm btn-outline-primary"
    //                 onClick={() => handleEditHobby(index)}
    //               >
    //                 Edit
    //               </button>
    //             )}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>

      <div className="community-content">
        <div className="py-4 container-fluid">
          <div className="mb-4 post-form-container position-relative">
            <button
              type="button"
              className={`btn btn-primary rounded-pill new-post-btn ${
                isOpen ? "active rotate" : ""
              }`}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              New ➕
            </button>
            {isOpen && <AddPost />}
          </div>

          <div className="pt-3 mx-auto posts-container row flex-column">
            {posts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
  //   </div>
  );
}
