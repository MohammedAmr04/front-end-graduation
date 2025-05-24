import PropTypes from "prop-types";
import "../../../styles/global.css";
import "./BookCard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookCard({ item }) {
  const { title, author, id } = item;
  const { id: userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className="border-0 book-card-responsive card move-up">
      <div className="img-container-responsive">
        <img
          src={`https://www.gutenberg.org/cache/epub/${id}/pg${id}.cover.medium.jpg`}
          alt={title}
          className="rounded-3 book-img-responsive"
        />
      </div>
      <div className="book-title-responsive">{title}</div>
      <p className="book-author-responsive d-none d-md-block">{author}</p>
      <div className="gap-2 mt-2 buttons-container d-flex justify-content-between">
        <button
          className="button button-primary book-btn-responsive"
          onClick={() => navigate(`/book/${id}`)}
        >
          Details
        </button>
        <button
          className="button button-second book-btn-responsive"
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
