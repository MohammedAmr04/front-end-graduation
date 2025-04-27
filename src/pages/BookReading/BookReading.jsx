import { useState } from "react";
import styles from "./BookReading.module.css";
import SidebarBook from "../../components/common/bookReading/SidebarBook";
import BookViewer from "../../components/common/bookReading/BookViewer";

function BookReading() {
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#fff");

  const pages = [
    { front: "مقدمة", back: "فصل 1" },
    { front: "فصل 2", back: "فصل 3" },
    { front: "خاتمة", back: "شكراً للقراءة!" },
  ];

  return (
    <div className={styles.container}>
      <SidebarBook
        setFontSize={setFontSize}
        setFontFamily={setFontFamily}
        setTextColor={setTextColor}
        setBgColor={setBgColor}
      />
      <BookViewer
        pages={pages}
        bgColor={bgColor}
        textColor={textColor}
        fontFamily={fontFamily}
        fontSize={fontSize}
      />
    </div>
  );
}

export default BookReading;
