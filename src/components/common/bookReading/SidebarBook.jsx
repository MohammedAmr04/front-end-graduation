import PropTypes from "prop-types";
import styles from "./SidebarBook.module.css";
export default function SidebarBook({
  setFontSize,
  setFontFamily,
  setTextColor,
  setBgColor,
}) {
  return (
    <div className={styles.sidebar}>
      <h3>Customize</h3>
      <label>Font Size:</label>
      <input
        type="range"
        min="12"
        max="30"
        value={parseInt(setFontSize)}
        onChange={(e) => setFontSize(`${e.target.value}px`)}
      />

      <label>Font Family:</label>
      <select onChange={(e) => setFontFamily(e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
      </select>

      <label>Text Color:</label>
      <input type="color" onChange={(e) => setTextColor(e.target.value)} />

      <label>Background Color:</label>
      <input type="color" onChange={(e) => setBgColor(e.target.value)} />
    </div>
  );
}

SidebarBook.propTypes = {
  setFontSize: PropTypes.func.isRequired,
  setFontFamily: PropTypes.func.isRequired,
  setTextColor: PropTypes.func.isRequired,
  setBgColor: PropTypes.func.isRequired,
};
