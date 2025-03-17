import { useState } from "react";
import InputField from "../../../forms/InputField";
import "./styles.css";
import ImageUploader from "./../img-uploader/ImageUploader";
export default function AddPost() {
  const profileImage = "/src/assets/me.jpg";
  const [images, setImages] = useState([]);
  const [post, setPost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post, images);
  };

  return (
    <form className="add-post py-4 rounded-3 px-3 " onSubmit={handleSubmit}>
      <div className="add-post-header">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={profileImage}
            className=" rounded-circle me-2"
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
      <div className="add-post-buttons pt-3 mt-3 d-flex justify-content-center align-items-center">
        <ImageUploader images={images} setImages={setImages} />
      </div>
      <div className="add-post-buttons pt-3 mt-3 d-flex justify-content-center align-items-center">
        <button className="btn btn-primary">Post</button>
      </div>
    </form>
  );
}
