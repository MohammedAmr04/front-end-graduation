import PropTypes from "prop-types";
import "./styles.css";
import PostSlider from "../slider/PostSlider";

const ImageUploader = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div>
      <label className="upload-button">
        📷 Choose Images
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </label>

      {images.length > 0 && (
        <div className="image-preview">
          <PostSlider>
            {images.map((img) => (
              <div key={img.id} className="image-container">
                <img src={img.id} alt="Preview" className="preview-img" />
                <button
                  className="remove-button"
                  onClick={() => removeImage(img.id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </PostSlider>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

ImageUploader.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
};
