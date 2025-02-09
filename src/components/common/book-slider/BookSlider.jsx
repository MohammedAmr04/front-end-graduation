import { useState } from "react";
import "../../../styles/global.css";
import BookCard from "../card/BookCard";

const initData = [
  { id: 1, title: "Title", src: "/src/assets/img/classic2.jpg" },
  { id: 2, title: "Title", src: "/src/assets/img/classic3.jpg" },
  { id: 3, title: "Title", src: "/src/assets/img/classic4.jpg" },
  { id: 4, title: "Title", src: "/src/assets/img/classic5.jpg" },
  { id: 5, title: "Title", src: "/src/assets/img/classic6.jpg" },
];
export default function BookSlider() {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <div className=" position-relative mb-5 pb-4">
      <h2 className="main-header mb-3">Classic</h2>
      <div className="d-flex justify-content-between align-items-center flex-wrap ">
        {initData.map((item) => (
          <div className="d-flex mx-auto my-3 my-lg-0" key={item.src}>
            <BookCard
              item={item}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
