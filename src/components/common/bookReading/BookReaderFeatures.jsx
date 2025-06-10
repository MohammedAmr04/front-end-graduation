// src/BookReaderFeatures.jsx
import PropTypes from "prop-types";
import { HighlightColorPicker } from "./HighlightFeatures";
import { FontSelector } from "./FontSelector";
import "./BookReaderFeatures.css";

export function BookReaderFeatures(props) {
  const {
    theme,
    handleThemeChange,
    customFonts,
    fontFamily,
    handleFontChange,
    setShowSidebar,
    highlightColors,
    highlightColor,
    setHighlightColor,
  } = props;

  return (
    <div className="bookreader-features-bar">
      {/* Theme buttons */}
      <button
        onClick={() => handleThemeChange("light")}
        className={`bookreader-btn${theme === "light" ? " active-light" : ""}`}
      >
        Light
      </button>
      <button
        onClick={() => handleThemeChange("dark")}
        className={`bookreader-btn${theme === "dark" ? " active-dark" : ""}`}
      >
        Dark
      </button>
      <FontSelector
        customFonts={customFonts}
        fontFamily={fontFamily}
        onFontChange={handleFontChange}
      />
      <button
        onClick={() => setShowSidebar((v) => !v)}
        className="bookreader-btn highlight"
      >
        Highlights
      </button>
      <HighlightColorPicker
        highlightColors={highlightColors}
        highlightColor={highlightColor}
        setHighlightColor={setHighlightColor}
      />
    </div>
  );
}

BookReaderFeatures.propTypes = {
  theme: PropTypes.string.isRequired,
  handleThemeChange: PropTypes.func.isRequired,
  customFonts: PropTypes.array.isRequired,
  fontFamily: PropTypes.string.isRequired,
  handleFontChange: PropTypes.func.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
  highlightColors: PropTypes.array.isRequired,
  highlightColor: PropTypes.string.isRequired,
  setHighlightColor: PropTypes.func.isRequired,
};
