// BookPopup.jsx
import PropTypes from "prop-types";

function BookPopup({ title, author, onAccept }) {
  return (
    <div style={{ textAlign: "center", width: "150px" }}>
      <h6 style={{ marginBottom: "5px", fontWeight: "bold" }}>{title}</h6>
      <p style={{ margin: "0 0 10px", fontSize: "0.9em" }}>By {author}</p>
      <button className="btn btn-sm btn-success" onClick={onAccept}>
        Accept
      </button>
    </div>
  );
}

BookPopup.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default BookPopup;
