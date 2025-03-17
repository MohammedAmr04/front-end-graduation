import PropTypes from "prop-types";
import "../../../styles/global.css";
import Overlay from "../overlay/Overlay";

export default function BookCard({ item, setSelectedId, selectedId }) {
  const { title, src, id } = item;

  const handleClick = () => {
    setSelectedId(id);
  };

  return (
    <div
      className="my-3 border-0 card"
      style={{ backgroundColor: "transparent" }}
    >
      {/* صورة الكتاب */}
      <div className="mb-3 img-container move-up">
        <img
          src={src}
          alt={title}
          className="rounded-3 position-relative"
          style={{
            width: "180px",
            height: "240px",
            filter: "drop-shadow(3px 3px 6px black)",
          }}
        />
      </div>

      {/* زر التفاصيل */}
      <button
        className="px-3 py-2 btn"
        style={{ backgroundColor: "#ccc", color: "black", fontWeight: "bold" }}
        onClick={handleClick}
      >
        Details
      </button>

      <Overlay isOpen={selectedId === id} onClose={() => setSelectedId(null)}>
        <div className="content d-flex align-items-center">
          <div className="img-container">
            <img
              src={src}
              alt={title}
              className="rounded-3"
              style={{
                width: "140px",
                height: "200px",
              }}
            />
          </div>
          <div className="text ms-4">
            <h3>{title}</h3>
            <p>Author</p>
          </div>
        </div>
        <div className="py-3 summary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dolorem
          iusto animi omnis, nemo obcaecati saepe id amet vel.
        </div>
      </Overlay>
    </div>
  );
}

BookCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedId: PropTypes.func.isRequired,
  selectedId: PropTypes.number,
};
