import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./BookViewer.module.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { cleanAndSplitText } from "../../../utils/util";
import Loader from "./../loader/Loader";

const BookViewer = ({ bookId }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(1);

  const bookRef = useRef(null);
  const papersRef = useRef([]);

  const numOfPapers = pages.length;
  const maxLocation = numOfPapers + 1;

  const openBook = useCallback(() => {
    bookRef.current.style.transform = "translateX(0%)";
  }, []);

  const closeBook = useCallback((isAtBeginning) => {
    if (isAtBeginning) {
      bookRef.current.style.transform = "translateX(-50%)";
    } else {
      bookRef.current.style.transform = "translateX(50%)";
    }
  }, []);

  const goNextPage = useCallback(() => {
    if (
      currentLocation < maxLocation &&
      papersRef.current[currentLocation - 1]
    ) {
      if (currentLocation === 1) openBook();
      const paper = papersRef.current[currentLocation - 1];
      paper.classList.add(styles.flipped);
      paper.style.zIndex = numOfPapers - currentLocation + 1; // ترتيب الصفحات بشكل طبيعي
      if (currentLocation === numOfPapers) closeBook(false);
      setCurrentLocation((prev) => prev + 1);
    }
  }, [currentLocation, maxLocation, numOfPapers, openBook, closeBook]);

  const goPrevPage = useCallback(() => {
    if (currentLocation > 1 && papersRef.current[currentLocation - 2]) {
      if (currentLocation === 2) closeBook(true);
      const paper = papersRef.current[currentLocation - 2];
      paper.classList.remove(styles.flipped);
      paper.style.zIndex = currentLocation - 2; // ترتيب الصفحات بشكل طبيعي
      if (currentLocation === maxLocation) openBook();
      setCurrentLocation((prev) => prev - 1);
    }
  }, [currentLocation, maxLocation, numOfPapers, openBook, closeBook]);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7159/api/Books/GetBookById/${bookId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book.");
        }
        const data = await response.json();
        const splitPages = cleanAndSplitText(data.text, 400);
        setPages(splitPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        goNextPage();
      } else if (event.key === "ArrowLeft") {
        goPrevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNextPage, goPrevPage]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!pages.length) {
    return <div className={styles.noPages}>No pages to display.</div>;
  }

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
            style={{ zIndex: numOfPapers - index }}
          >
            <div className={styles.front}>
              <div className={styles.frontContent}>{page.front}</div>
            </div>
            <div className={styles.back}>
              <div className={styles.backContent}>{page.back}</div>
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
  bookId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BookViewer;
