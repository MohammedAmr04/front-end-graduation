import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./BookViewer.module.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const BookViewer = ({ pages }) => {
  const [currentLocation, setCurrentLocation] = useState(1);
  const numOfPapers = pages.length;
  const maxLocation = numOfPapers + 1;
  const bookRef = useRef(null);
  const papersRef = useRef([]);

  const openBook = () => {
    bookRef.current.style.transform = "translateX(50%)";
  };

  const closeBook = (isAtBeginning) => {
    if (isAtBeginning) {
      bookRef.current.style.transform = "translateX(0%)";
    } else {
      bookRef.current.style.transform = "translateX(100%)";
    }
  };

  const goNextPage = () => {
    if (currentLocation < maxLocation) {
      if (currentLocation === 1) {
        openBook();
      }
      papersRef.current[currentLocation - 1]?.classList.add(styles.flipped);
      papersRef.current[currentLocation - 1].style.zIndex = currentLocation;
      if (currentLocation === numOfPapers) {
        closeBook(false);
      }
      setCurrentLocation((prev) => prev + 1);
    }
  };

  const goPrevPage = () => {
    if (currentLocation > 1) {
      if (currentLocation === 2) {
        closeBook(true);
      }
      papersRef.current[currentLocation - 2]?.classList.remove(styles.flipped);
      papersRef.current[currentLocation - 2].style.zIndex =
        numOfPapers - (currentLocation - 2);
      if (currentLocation === maxLocation) {
        openBook();
      }
      setCurrentLocation((prev) => prev - 1);
    }
  };

  // إضافة مستمع حدث لوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        goNextPage();
      } else if (event.key === "ArrowLeft") {
        goPrevPage();
      }
    };

    // إضافة المستمع عند تحميل المكون
    window.addEventListener("keydown", handleKeyDown);

    // تنظيف المستمع عند إلغاء تحميل المكون
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentLocation, numOfPapers, maxLocation]);

  return (
    <div className={styles.bookViewerContainer}>
      <button
        onClick={goPrevPage}
        className={styles.navButton}
        aria-label="Previous page"
        tabIndex="0"
      >
        <FaArrowCircleLeft />
      </button>

      <div
        className={styles.book}
        ref={bookRef}
        role="document"
        aria-live="polite"
      >
        {pages.map((page, index) => (
          <div
            key={index}
            className={styles.paper}
            ref={(el) => (papersRef.current[index] = el)}
            style={{ zIndex: pages.length - index }}
          >
            <div className={styles.front}>
              <div className={styles.frontContent}>
                <h1>{page.front}</h1>
              </div>
            </div>
            <div className={styles.back}>
              <div className={styles.backContent}>
                <h1>{page.back}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goNextPage}
        className={styles.navButton}
        aria-label="Next page"
        tabIndex="0"
      >
        <FaArrowCircleRight />
      </button>
    </div>
  );
};

BookViewer.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      front: PropTypes.string.isRequired,
      back: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BookViewer;
