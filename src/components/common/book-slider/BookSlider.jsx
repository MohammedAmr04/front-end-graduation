import { useState } from "react";
import "../../../styles/global.css";
import BookCard from "../card/BookCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./styles.css";
const initData = [
  {
    id: 1,
    title: "Title",
    src: "https://www.gutenberg.org/cache/epub/36/pg36.cover.medium.jpg",
  },
  { id: 2, title: "Title", src: "/src/assets/img/classic3.jpg" },
  { id: 3, title: "Title", src: "/src/assets/img/classic4.jpg" },
  { id: 4, title: "Title", src: "/src/assets/img/classic5.jpg" },
  { id: 5, title: "Title", src: "/src/assets/img/classic6.jpg" },
];
export default function BookSlider() {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <div className="py-5 position-relative">
      <h2 className="mb-3 main-header">Classic</h2>
      <div className="flex-wrap pb-3 d-flex justify-content-between align-items-center ">
        {initData.map((item) => (
          <div className="mx-auto my-3 d-flex my-lg-0" key={item.src}>
            <BookCard
              item={item}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
            />
          </div>
        ))}
      </div>
      <div className="container-arrow-right button-view">
        {" "}
        <Link>View All </Link>
        <FaArrowRight className="arrow-right" />
      </div>
    </div>
  );
}
