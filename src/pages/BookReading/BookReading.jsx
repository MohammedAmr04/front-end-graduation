// import { useState } from "react";
import styles from "./BookReading.module.css";
import BookViewer from "../../components/common/bookReading/BookViewer";
import { useParams } from "react-router-dom";
// import HeaderBook from "../../components/common/bookReading/HeaderBook";

function BookReading() {
  // const [fontSize, setFontSize] = useState("16px");
  // const [fontFamily, setFontFamily] = useState("Arial");
  // const [textColor, setTextColor] = useState("#000");
  // const [bgColor, setBgColor] = useState("#fff");
  const { bookid } = useParams();

  return (
    <div className={styles.container}>
      {/* <HeaderBook
        setFontSize={setFontSize}
        setFontFamily={setFontFamily}
        setTextColor={setTextColor}
        setBgColor={setBgColor}
      /> */}
      <BookViewer bookId={bookid} />
    </div>
  );
}

export default BookReading;
