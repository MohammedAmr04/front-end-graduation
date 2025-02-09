import PropTypes from "prop-types";
import "../../../styles/global.css";

export default function BookCard({ item, setSelectedId, selectedId }) {
  const { title, src, id } = item;

  const handleClick = () => {
    setSelectedId(id);
  };

  return (
    <div
      className="card border-0 my-3"
      style={{ backgroundColor: "transparent" }}
    >
      {/* صورة الكتاب */}
      <div className="img-container mb-3 move-up">
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
        className="btn px-3 py-2"
        style={{ backgroundColor: "#ccc", color: "black", fontWeight: "bold" }}
        onClick={handleClick}
      >
        Details
      </button>

      {selectedId === id && (
        <div
          className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
          onClick={() => setSelectedId(null)}
        >
          <div
            className="modal-content position-relative rounded-3 p-3"
            style={{
              backgroundColor: "white",
              width: "400px",
              zIndex: 1050,
            }}
            onClick={(e) => e.stopPropagation()}
          >
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
            <div className="summary py-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              dolorem iusto animi omnis, nemo obcaecati saepe id amet vel.
            </div>

            <div className="close-btn position-absolute top-0 end-0 p-2">
              <button
                className="btn btn-danger rounded-5"
                onClick={() => setSelectedId(null)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
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
