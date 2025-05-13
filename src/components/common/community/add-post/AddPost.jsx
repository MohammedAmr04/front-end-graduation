import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputField from "../../../forms/InputField";
import styles from "./AddPost.module.css";
import ImageUploader from "../img-uploader/ImageUploader";
import { useToast } from "../../../../hooks/useToast";

export default function AddPost() {
  const profileImage = "/src/assets/me.jpg";
  const { token } = useSelector((state) => state.auth);
  const { showSuccess, showError } = useToast();

  const [images, setImages] = useState([]);
  const [post, setPost] = useState("");
  const [communityType, setCommunityType] = useState("");
  const [communityTypes, setCommunityTypes] = useState([]);

  const selectedCommunity = communityTypes.find(
    (c) => c.id.toString() === communityType
  );
  const removeImage = () => {
    setImages([]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://localhost:7159/api/Community", {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        const data = await response.json();
        setCommunityTypes(data);
      } catch (error) {
        showError("Error fetching community types.");
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleJoin = async () => {
    try {
      const response = await fetch(
        `https://localhost:7159/api/Community/${+communityType}/join`,
        {
          method: "POST",

          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to join");

      showSuccess(`You joined ${selectedCommunity.name} successfully!`);

      // Update the communityTypes to reflect membership
      setCommunityTypes((prev) =>
        prev.map((c) =>
          c.id.toString() === communityType ? { ...c, isMember: true } : c
        )
      );
    } catch (error) {
      showError("Failed to join community.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.trim()) return showError("Please write something in the post.");
    if (!selectedCommunity) return showError("Please select a community.");
    // if (!selectedCommunity.isMember)
    //   return showError("You must join this community before posting.");
    // if (images.length === 0) return showError("Please upload an image.");

    const formData = new FormData();
    formData.append("Content", post);
    formData.append("CommunityId", communityType);
    formData.append("ImageFile", images[0].file);

    try {
      const response = await fetch(
        "https://localhost:7159/api/Community/Posts",
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Post creation failed: ${errorText}`);
      }

      await response.json();
      showSuccess("Post created successfully!");
      setPost("");
      setImages([]);
      setCommunityType("");
    } catch (error) {
      showError("Failed to create post. Please try again.");
      console.error(error);
    }
  };

  return (
    <form
      className={`px-3 py-4 ${styles.addPost} rounded-3`}
      onSubmit={handleSubmit}
    >
      <div className={styles.addPostHeader}>
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={profileImage}
            className="rounded-circle me-2"
            alt="Profile"
            style={{ width: "40px", height: "40px" }}
          />
          <InputField
            type="text"
            placeHolder="What's on your mind?"
            className="w-100"
            labelRender={false}
            name="post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
      </div>

      <div className="gap-2 mb-3 d-flex align-items-center">
        <select
          style={{ width: "200px" }}
          className="form-select"
          value={communityType}
          onChange={(e) => setCommunityType(e.target.value)}
        >
          <option value="">Select Community</option>
          {communityTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        {selectedCommunity && !selectedCommunity.isMember && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleJoin}
          >
            Join
          </button>
        )}

        {selectedCommunity && selectedCommunity.isMember && (
          <button className="btn btn-success" disabled>
            Joined ✅
          </button>
        )}
        <ImageUploader images={images} setImages={setImages} />
        <button className="py-2 btn btn-primary" type="submit">
          Post
        </button>
      </div>
      <div>
        {" "}
        {images.length > 0 && (
          <div className="mx-auto image-preview">
            <div className="image-container">
              <img src={images[0].id} alt="Preview" className="preview-img" />
              <button className="remove-button" onClick={removeImage}>
                ❌
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
