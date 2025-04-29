import { useRef, useState, useEffect } from "react";
import { EpubViewer, ReactEpubViewer } from "react-epub-viewer";
import Loader from "../components/common/loader/Loader";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import styles from "./Test.module.css";

const Test = () => {
  const viewerRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(9);
  const [lineHeight, setLineHeight] = useState(1.7);
  const [horizontalMargin, setHorizontalMargin] = useState(33);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [viewDirection, setViewDirection] = useState("ltr");
  const [viewSpread, setViewSpread] = useState("single");

  // استرجاع تقدم القراءة من localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem("lastLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  // حفظ تقدم القراءة في localStorage
  useEffect(() => {
    if (location) {
      localStorage.setItem("lastLocation", location);
    }
  }, [location]);

  // تحديث إعدادات القارئ لما تتغير
  useEffect(() => {
    if (viewerRef.current && viewerRef.current.book) {
      const { rendition } = viewerRef.current.book;
      if (rendition && rendition.themes) {
        rendition.themes.default({
          "*": {
            "font-size": `${fontSize}px !important`,
            "line-height": `${lineHeight} !important`,
            "margin-left": `${horizontalMargin}px !important`,
            "margin-right": `${horizontalMargin}px !important`,
            "font-family": `${fontFamily} !important`,
          },
        });
      }
    }
  }, [fontSize, lineHeight, horizontalMargin, fontFamily]);

  const handleNextPage = () => {
    if (viewerRef.current) {
      viewerRef.current.nextPage();
    }
  };

  const handlePrevPage = () => {
    if (viewerRef.current) {
      viewerRef.current.prevPage();
    }
  };

  // استخراج بيانات الكتاب
  const handleBookReady = (book) => {
    book.ready.then(() => {
      book.rendition.on("rendered", () => {
        const displayed = book.rendition.displayed();
        displayed.then((info) => {
          setPageNumber(info.page || 1);
          setTotalPages(info.totalPages || 1775);
        });
      });
    });
  };

  // استخراج رقم الصفحة من location (بديل)
  useEffect(() => {
    if (location && !totalPages) {
      if (typeof location === "number") {
        setPageNumber(location);
      } else if (typeof location === "string") {
        const pageMatch = location.match(/\/(\d+)/);
        if (pageMatch) {
          setPageNumber(parseInt(pageMatch[1], 10));
        }
      }
    }
  }, [location, totalPages]);

  // فتح وإغلاق الـ Sidebar
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>EPUB VIEWER</h1>
        <div className={styles.headerButtons}>
          <button className={styles.headerButton}>Contents</button>
          <button className={styles.headerButton} onClick={toggleSettings}>
            Setting
          </button>
          <button className={styles.headerButton}>Highlights</button>
        </div>
      </div>

      {/* القارئ */}
      <div className={styles.readerContainer}>
        <EpubViewer
          key={`${viewDirection}-${viewSpread}`} // لإعادة تحميل القارئ لما viewDirection أو viewSpread تتغير
          url={"../../public/pg75972-images-3.epub"}
          loadingView={<Loader />}
          ref={viewerRef}
          viewerOption={{
            flow: viewSpread === "single" ? "paginated" : "scrolled",
            direction: viewDirection,
          }}
          location={location}
          onLocationChange={(loc) => {
            console.log("Location:", loc);
            setLocation(loc);
          }}
          onBookReady={handleBookReady}
        />
        <ReactEpubViewer />
      </div>

      {/* أزرار التنقل ورقم الصفحة */}
      <div className={styles.navContainer}>
        <button onClick={handlePrevPage} className={styles.navButton}>
          <FaArrowLeft />
        </button>
        <span className={styles.pageNumber}>
          {pageNumber} / {totalPages || "Loading..."}
        </span>
        <button onClick={handleNextPage} className={styles.navButton}>
          <FaArrowRight />
        </button>
      </div>

      {/* Sidebar */}
      {showSettings && (
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Setting</h2>
            <button onClick={toggleSettings} className={styles.closeButton}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.settingItem}>
            <label>View Direction</label>
            <div className={styles.buttonGroup}>
              <button
                className={viewDirection === "ltr" ? styles.activeButton : ""}
                onClick={() => setViewDirection("ltr")}
              >
                Left-to-Right
              </button>
              <button
                className={viewDirection === "rtl" ? styles.activeButton : ""}
                onClick={() => setViewDirection("rtl")}
              >
                Right-to-Left
              </button>
            </div>
          </div>

          <div className={styles.settingItem}>
            <label>View Spread</label>
            <div className={styles.buttonGroup}>
              <button
                className={viewSpread === "single" ? styles.activeButton : ""}
                onClick={() => setViewSpread("single")}
              >
                Single Page
              </button>
              <button
                className={viewSpread === "double" ? styles.activeButton : ""}
                onClick={() => setViewSpread("double")}
              >
                Double Page
              </button>
            </div>
          </div>

          <div className={styles.settingItem}>
            <label>Font</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className={styles.select}
            >
              <option value="Roboto">Roboto</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>

          <div className={styles.settingItem}>
            <label>Size: {fontSize}</label>
            <div className={styles.sliderContainer}>
              <input
                type="range"
                min="9"
                max="30"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
          </div>

          <div className={styles.settingItem}>
            <label>Line Height: {lineHeight}</label>
            <div className={styles.sliderContainer}>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                className={styles.slider}
              />
            </div>
          </div>

          <div className={styles.settingItem}>
            <label>Horizontal Margin: {horizontalMargin}</label>
            <div className={styles.sliderContainer}>
              <input
                type="range"
                min="0"
                max="100"
                value={horizontalMargin}
                onChange={(e) => setHorizontalMargin(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
