import { ReactReader } from "react-reader";
import { useState, useRef, useEffect } from "react";
import { HighlightSidebar } from "./HighlightFeatures";
import { BookReaderFeatures } from "./BookReaderFeatures";
import StickyNote from "./stickynotes/StickyNote";
import { DndContext } from "@dnd-kit/core";
import "./BookViewer.css";
import PropTypes from "prop-types";

const STORAGE_KEY = "epub-location";
const THEME_KEY = "epub-theme";
const themes = {
  light: {
    body: { background: "#fff", color: "#222" },
    readerArea: { background: "#fff", color: "#222" },
  },
  dark: {
    body: { background: "#181a1b", color: "#e8e6e3" },
    readerArea: { background: "#181a1b", color: "#e8e6e3" },
  },
};

const highlightColors = [
  { name: "Yellow", color: "#ffe066" },
  { name: "Pink", color: "#ffadad" },
  { name: "Green", color: "#caffbf" },
  { name: "Blue", color: "#9bf6ff" },
  { name: "Purple", color: "#bdb2ff" },
];

const customFonts = [
  { name: "Default", fontFamily: "inherit" },
  { name: "Serif", fontFamily: "serif" },
  { name: "Sans-serif", fontFamily: "sans-serif" },
  { name: "Georgia", fontFamily: "Georgia, serif" },
  { name: "OpenDyslexic", fontFamily: "'OpenDyslexic', Arial, sans-serif" },
];

const BookViewer = ({ id }) => {
  const [location, setLocation] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || undefined;
  });
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light"
  );
  const [selectionText, setSelectionText] = useState("");
  const [highlightColor, setHighlightColor] = useState(
    highlightColors[0].color
  );
  const [highlights, setHighlights] = useState([]); // {cfiRange, text, color}
  const [showSidebar, setShowSidebar] = useState(false);
  const [fontFamily, setFontFamily] = useState(customFonts[0].fontFamily);
  const [stickyNotes, setStickyNotes] = useState([]);
  const renditionRef = useRef(null);
  const [bookUrl, setBookUrl] = useState("");
  useEffect(() => {
    const fetchBookUrl = async () => {
      try {
        const response = await fetch(`http://localhost:3000/book/${id}`);
        const data = await response.json();
        setBookUrl(data.path);
      } catch (error) {
        console.error("Error fetching book URL:", error);
      }
    };

    fetchBookUrl();
  }, [id]);
  const handleLocationChanged = (loc) => {
    setLocation(loc);
    localStorage.setItem(STORAGE_KEY, loc);
  };
  const handleThemeChange = (mode) => {
    setTheme(mode);
    localStorage.setItem(THEME_KEY, mode);
    if (renditionRef.current) {
      renditionRef.current.themes.select(mode);
      renditionRef.current.themes.override("body", {
        fontFamily,
        color: themes[mode].body.color,
      });
    }
  };
  const handleFontChange = (font) => {
    setFontFamily(font);
    if (renditionRef.current) {
      // Use inject to set font-family on the book's body directly
      renditionRef.current.getContents().forEach((content) => {
        content.document.body.style.fontFamily = font;
      });
      renditionRef.current.themes.override("body", {
        fontFamily: font,
        color: themes[theme].body.color,
      });
    }
  };

  const handleRendition = (rendition) => {
    renditionRef.current = rendition;
    rendition.themes.register("light", {
      body: { background: "#fff", color: "#222", fontFamily },
      highlight: { opacity: 0.7 },
    });
    rendition.themes.register("dark", {
      body: { background: "#181a1b", color: "#e8e6e3", fontFamily },
      highlight: { opacity: 0.7 },
    });
    rendition.themes.select(theme);
    rendition.themes.override("body", {
      fontFamily,
      color: themes[theme].body.color,
    });
    // Inject fontFamily directly on all loaded contents
    rendition.getContents().forEach((content) => {
      content.document.body.style.fontFamily = fontFamily;
    });

    // Render all highlights on load
    highlights.forEach((h) => {
      rendition.annotations.add("highlight", h.cfiRange, {}, null, h.color);
    });

    // Add selection listener
    rendition.on("selected", (cfiRange, contents) => {
      const text =
        contents.window.getSelection &&
        contents.window.getSelection().toString();
      setSelectionText(text);
      // Add highlight to book
      rendition.annotations.add(
        "highlight",
        cfiRange,
        {},
        null,
        highlightColor
      );
      // Save highlight to state
      setHighlights((prev) => [
        ...prev,
        { cfiRange, text, color: highlightColor },
      ]);
    });
  };

  // Remove a highlight
  const removeHighlight = (cfiRange) => {
    setHighlights((prev) => prev.filter((h) => h.cfiRange !== cfiRange));
    if (renditionRef.current) {
      renditionRef.current.annotations.remove(cfiRange, "highlight");
    }
  };

  // Show highlight in book
  const showHighlight = (cfiRange) => {
    if (renditionRef.current) {
      renditionRef.current.display(cfiRange);
    }
  };

  // Sticky Note Handlers
  const addStickyNote = (x = 100, y = 100) => {
    setStickyNotes((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "",
        x,
        y,
      },
    ]);
  };
  const deleteStickyNote = (id) => {
    setStickyNotes((prev) => prev.filter((n) => n.id !== id));
  };
  const updateStickyNoteText = (id, text) => {
    setStickyNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text } : n))
    );
  };
  // Update sticky note position on drag end
  const handleStickyDragEnd = (event) => {
    const { active, delta } = event;
    setStickyNotes((prev) =>
      prev.map((n) =>
        n.id === active.id ? { ...n, x: n.x + delta.x, y: n.y + delta.y } : n
      )
    );
  };

  // Re-apply highlights when highlights, theme, or highlightColor changes
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.select(theme);
      // Remove only highlight annotations, not all types
      if (
        renditionRef.current.annotations &&
        renditionRef.current.annotations._annotations
      ) {
        const highlightsToRemove = Object.keys(
          renditionRef.current.annotations._annotations.highlight || {}
        );
        highlightsToRemove.forEach((cfi) => {
          renditionRef.current.annotations.remove(cfi, "highlight");
        });
      }
      highlights.forEach((h) => {
        // Always use the color stored in the highlight object
        renditionRef.current.annotations.add(
          "highlight",
          h.cfiRange,
          {},
          null,
          h.color
        );
      });
    }
  }, [theme, highlights]);

  // When highlightColor changes, do NOT update previous highlights
  useEffect(() => {
    if (highlights.length > 0 && !selectionText) {
      setHighlights((prev) =>
        prev.map((h, i) =>
          i === prev.length - 1 ? { ...h, color: highlightColor } : h
        )
      );
    }
  }, [highlightColor, highlights.length, selectionText]);

  // Show selection text for 2 seconds, then hide
  useEffect(() => {
    if (selectionText) {
      const timeout = setTimeout(() => setSelectionText(""), 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectionText]);

  // Ensure font color is applied together with font family
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.override("body", {
        fontFamily,
        color: themes[theme].body.color,
      });
      renditionRef.current.getContents().forEach((content) => {
        content.document.body.style.fontFamily = fontFamily;
      });
    }
  }, [fontFamily, theme]);

  return (
    <div className="app-root">
      <HighlightSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        highlights={highlights}
        showHighlight={showHighlight}
        removeHighlight={removeHighlight}
      />
      <div
        className="app-main-content"
        onDoubleClick={(e) =>
          addStickyNote(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
      >
        <button
          className="app-add-sticky-btn"
          style={{ position: "absolute", top: 16, left: 16, zIndex: 30 }}
          onClick={() => addStickyNote(120, 120)}
        >
          + Add Sticky Note
        </button>
        <BookReaderFeatures
          theme={theme}
          handleThemeChange={handleThemeChange}
          customFonts={customFonts}
          fontFamily={fontFamily}
          handleFontChange={handleFontChange}
          setShowSidebar={setShowSidebar}
          highlightColors={highlightColors}
          highlightColor={highlightColor}
          setHighlightColor={setHighlightColor}
        />
        {/* Sticky Notes */}
        <DndContext onDragEnd={handleStickyDragEnd}>
          {stickyNotes.map((note) => (
            <StickyNote
              key={note.id}
              note={note}
              onDelete={deleteStickyNote}
              onTextChange={updateStickyNoteText}
            />
          ))}
        </DndContext>
        {selectionText && (
          <div className="app-selection-text">
            <strong>Selected:</strong> {selectionText}
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 12, color: "#888" }}>
                Highlight color:{" "}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: 16,
                  height: 16,
                  background: highlightColor,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  verticalAlign: "middle",
                }}
              />
            </div>
          </div>
        )}
        <ReactReader
          url={`http://localhost:3000/${bookUrl}`}
          location={location}
          locationChanged={handleLocationChanged}
          styles={themes[theme]}
          getRendition={handleRendition}
        />
      </div>
    </div>
  );
};

BookViewer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BookViewer;
