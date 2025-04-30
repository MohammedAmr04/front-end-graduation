import PropTypes from "prop-types";
import "../../../styles/global.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookCard({ item }) {
  const { title, author, id } = item;
  const { id: userId } = useSelector((state) => state.auth);
  console.log(userId);
  const navigate = useNavigate();
  return (
    <div
      className="my-3 border-0 card move-up"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div className="mx-auto mb-3 img-container ">
        <img
          src={`https://www.gutenberg.org/cache/epub/${id}/pg${id}.cover.medium.jpg`}
          alt={title}
          className="rounded-3 position-relative"
          style={{
            width: "180px",
            height: "240px",
          }}
        />
      </div>
      <p>{author}</p>
      <div className="gap-2 mt-2 buttons-container d-flex justify-content-between">
        <button
          className="button button-primary"
          onClick={() => navigate(`/book/${id}`)}
        >
          Details
        </button>
        <button
          className="button button-second"
          onClick={() => navigate(`/bookReading/${userId}/${id}`)}
        >
          Read
        </button>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};
