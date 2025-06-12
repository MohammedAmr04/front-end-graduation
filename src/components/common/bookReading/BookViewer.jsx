import { ReactReader } from "react-reader";
import { useState, useRef, useEffect } from "react";
import { HighlightSidebar } from "./HighlightFeatures";
import { BookReaderFeatures } from "./BookReaderFeatures";
import StickyNote from "./stickynotes/StickyNote";
import { DndContext } from "@dnd-kit/core";
import DOMPurify from "dompurify";
import "./BookViewer.css";
import PropTypes from "prop-types";

const STORAGE_KEY = "epub-location";
const THEME_KEY = "epub-theme";
const HIGHLIGHTS_KEY = "epub-highlights";
const STICKY_NOTES_KEY = "epub-sticky-notes";

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

const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "zh-cn", name: "Chinese (Simplified)" },
];

const MAX_STICKY_NOTES = 10;

const BookViewer = ({ id }) => {
  const [location, setLocation] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || undefined;
  });
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light"
  );
  const [selectionText, setSelectionText] = useState("");
  const [selectedCfiRange, setSelectedCfiRange] = useState(null);
  const [highlightColor, setHighlightColor] = useState(
    highlightColors[0].color
  );
  const [highlights, setHighlights] = useState(() => {
    const saved = localStorage.getItem(HIGHLIGHTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [showSidebar, setShowSidebar] = useState(false);
  const [fontFamily, setFontFamily] = useState(customFonts[0].fontFamily);
  const [stickyNotes, setStickyNotes] = useState(() => {
    const saved = localStorage.getItem(STICKY_NOTES_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [audioPath, setAudioPath] = useState("");
  const [ttsError, setTtsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const renditionRef = useRef(null);
  const [bookUrl, setBookUrl] = useState("");

  // Load book
  useEffect(() => {
    const fetchBookUrl = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/book/${id}`);
        if (!response.ok) throw new Error("Failed to load book");
        const data = await response.json();
        setBookUrl(data.path);
      } catch (error) {
        console.error("Error loading book:", error);
        setTtsError("Failed to load book");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookUrl();
  }, [id]);

  // Save highlights to localStorage
  useEffect(() => {
    localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(highlights));
  }, [highlights]);

  // Save sticky notes to localStorage
  useEffect(() => {
    localStorage.setItem(STICKY_NOTES_KEY, JSON.stringify(stickyNotes));
  }, [stickyNotes]);

  // Update location
  const handleLocationChanged = (loc) => {
    setLocation(loc);
    localStorage.setItem(STORAGE_KEY, loc);
  };

  // Apply theme and font
  const applyThemeAndFont = (rendition, theme, fontFamily) => {
    rendition.themes.select(theme);
    rendition.themes.override("body", {
      fontFamily,
      color: themes[theme].body.color,
    });
    rendition.getContents().forEach((content) => {
      content.document.body.style.fontFamily = fontFamily;
    });
  };

  const handleThemeChange = (mode) => {
    setTheme(mode);
    localStorage.setItem(THEME_KEY, mode);
    if (renditionRef.current) {
      applyThemeAndFont(renditionRef.current, mode, fontFamily);
    }
  };

  const handleFontChange = (font) => {
    setFontFamily(font);
    if (renditionRef.current) {
      applyThemeAndFont(renditionRef.current, theme, font);
    }
  };

  // Add highlight manually
  const addHighlight = () => {
    if (selectionText && selectedCfiRange && renditionRef.current) {
      renditionRef.current.annotations.add(
        "highlight",
        selectedCfiRange,
        {},
        null,
        highlightColor
      );
      setHighlights((prev) => [
        ...prev,
        {
          cfiRange: selectedCfiRange,
          text: selectionText,
          color: highlightColor,
        },
      ]);
      setSelectionText("");
      setSelectedCfiRange(null);
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
    applyThemeAndFont(rendition, theme, fontFamily);

    highlights.forEach((h) => {
      rendition.annotations.add("highlight", h.cfiRange, {}, null, h.color);
    });

    rendition.on("selected", (cfiRange, contents) => {
      const text =
        contents.window.getSelection &&
        contents.window.getSelection().toString();
      if (text) {
        const cleanText = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
        setSelectionText(cleanText);
        setSelectedCfiRange(cfiRange);
      }
    });
  };

  const removeHighlight = (cfiRange) => {
    setHighlights((prev) => prev.filter((h) => h.cfiRange !== cfiRange));
    if (renditionRef.current) {
      renditionRef.current.annotations.remove(cfiRange, "highlight");
    }
  };

  const showHighlight = (cfiRange) => {
    if (renditionRef.current) {
      renditionRef.current.display(cfiRange);
    }
  };

  const addStickyNote = (x = 100, y = 100) => {
    if (stickyNotes.length >= MAX_STICKY_NOTES) {
      setTtsError("Maximum limit of sticky notes (10) reached");
      return;
    }
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

  const handleStickyDragEnd = (event) => {
    const { active, delta } = event;
    setStickyNotes((prev) =>
      prev.map((n) =>
        n.id === active.id ? { ...n, x: n.x + delta.x, y: n.y + delta.y } : n
      )
    );
  };

  // Convert text to speech
  const handleTextToSpeech = async () => {
    if (!selectionText) {
      setTtsError("Please select text first");
      return;
    }
    setTtsError("");
    setAudioPath("");
    try {
      const response = await fetch("http://localhost:5000/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: selectionText,
          lang: selectedLanguage,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to convert text to speech");
      const fullAudioPath = `http://localhost:5000${data.audio_path}`;
      setAudioPath(fullAudioPath);
    } catch (error) {
      setTtsError(`Error: ${error.message}`);
    }
  };

  // Play audio automatically
  useEffect(() => {
    if (audioPath && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setTtsError("Failed to play audio, please try again");
      });
      audioRef.current.focus();
    }
  }, [audioPath]);

  // Update highlights efficiently
  useEffect(() => {
    if (renditionRef.current) {
      applyThemeAndFont(renditionRef.current, theme, fontFamily);
      highlights.forEach((h) => {
        if (!renditionRef.current.annotations._annotations[h.cfiRange]) {
          renditionRef.current.annotations.add(
            "highlight",
            h.cfiRange,
            {},
            null,
            h.color
          );
        }
      });
    }
  }, [theme, fontFamily, highlights]);

  // Hide selected text after 10 seconds
  useEffect(() => {
    if (selectionText) {
      const timeout = setTimeout(() => {
        setSelectionText("");
        setSelectedCfiRange(null);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [selectionText]);

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
        {isLoading && (
          <div style={{ position: "absolute", top: 50, left: 50, zIndex: 40 }}>
            Loading book...
          </div>
        )}
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
            <strong>Selected Text:</strong> {selectionText}
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 12, color: "#888" }}>
                Highlight Color:{" "}
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
            <div style={{ marginTop: 8 }}>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{ marginRight: 8 }}
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <button onClick={handleTextToSpeech} style={{ marginRight: 8 }}>
                Convert to Speech
              </button>
              <button onClick={addHighlight}>Add Highlight</button>
            </div>
            {ttsError && (
              <div style={{ color: "red", marginTop: 8 }}>{ttsError}</div>
            )}
          </div>
        )}
        <div className="book-reader-container">
          {bookUrl && !isLoading && (
            <ReactReader
              url={`http://localhost:3000/${bookUrl}`}
              location={location}
              locationChanged={handleLocationChanged}
              styles={themes[theme]}
              getRendition={handleRendition}
            />
          )}
          <div className="audio-player" style={{ marginTop: 10 }}>
            {audioPath && (
              <audio
                ref={audioRef}
                controls
                src={audioPath}
                style={{ width: "100%", maxWidth: "500px" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BookViewer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BookViewer;
