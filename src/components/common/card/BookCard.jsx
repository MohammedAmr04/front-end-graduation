import PropTypes from "prop-types";
import "../../../styles/global.css";
import { useNavigate } from "react-router-dom";

export default function BookCard({ item }) {
  const { title, src, id } = item;
  const navigate = useNavigate();
  return (
    <div
      className="my-3 border-0 card move-up"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div className="mb-3 img-container ">
        <img
          src={src}
          alt={title}
          className="rounded-3 position-relative"
          style={{
            width: "180px",
            height: "240px",
          }}
        />
      </div>
      <div className="gap-2 mt-2 buttons-container d-flex justify-content-between">
        <button className="button button-primary">Details</button>
        <button
          className="button button-second"
          onClick={() => navigate(`/book/${id}`)}
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
    src: PropTypes.string.isRequired,
  }).isRequired,
};
