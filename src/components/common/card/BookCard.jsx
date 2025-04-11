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
        <button
          className="px-3 py-2 btn"
          style={{
            backgroundColor: "#ccc",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={handleClick}
        >
          Details
        </button>
        <button
          className="px-3 py-2 btn"
          style={{
            backgroundColor: "#ccc",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={handleClick}
        >
          Read
        </button>
      </div>

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
