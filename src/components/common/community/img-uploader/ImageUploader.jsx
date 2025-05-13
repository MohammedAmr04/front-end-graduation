import PropTypes from "prop-types";
import "./styles.css";

const ImageUploader = ({ setImages }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImage = {
      id: URL.createObjectURL(file),
      file,
    };

    // استبدال الصورة الحالية
    setImages([newImage]);
  };

  return (
    <div>
      <label className="upload-button">
        📷 Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

ImageUploader.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
};

export default ImageUploader;
