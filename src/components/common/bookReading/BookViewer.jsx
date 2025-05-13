// Import necessary viewer and plugins from react-pdf-viewer
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { highlightPlugin } from "@react-pdf-viewer/highlight";
import PropTypes from "prop-types";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles for plugins
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";

// Import hooks and libraries
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { DndContext } from "@dnd-kit/core";
import StickyNote from "./../stickynotes/StickyNote";

export default function BookViewer({ id }) {
  const [notes, setNotes] = useState([]);
  const latestNoteRef = useRef(null);
  const [highlightAreas, setHighlightAreas] = useState([]);
  console.log(" id: ", id);

  // Initialize highlight plugin
  const highlightPluginInstance = highlightPlugin({
    highlightAreas,
    trigger: "TextSelection", // Enable highlighting on text selection
    renderHighlightTarget: (props) => (
      <div
        style={{
          background: "#ffc107",
          color: "#000",
          cursor: "pointer",
          padding: "2px 4px",
          borderRadius: "4px",
          fontSize: "12px",
        }}
        onClick={() => {
          props.onHighlightClicked(); // Trigger the highlight on click
        }}
      >
        Highlight
      </div>
    ),
    renderHighlightContent: () => (
      <div
        style={{
          background: "#ffc107",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#000",
        }}
      >
        Highlighted!
      </div>
    ),
    onHighlight: (props) => {
      console.log("تم تظليل النص:", props.highlight.strings.join(" "));
      const newAreas = [...highlightAreas, props.highlight];
      setHighlightAreas(newAreas); // Add new highlighted area
    },
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Add new sticky note with random position
  const handleAddNote = useCallback(() => {
    const newNote = {
      id: `${Date.now()}`,
      text: "",
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
    };
    setNotes((prev) => [...prev, newNote]);
  }, []);

  const handleDeleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const handleTextChange = useCallback((id, newText) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  }, []);

  // Update sticky note position on drag end
  const handleDragEnd = useCallback((event) => {
    const { active, delta } = event;
    setNotes((prev) =>
      prev.map((note) =>
        note.id === active.id
          ? {
              ...note,
              x: note.x + delta.x,
              y: note.y + delta.y,
            }
          : note
      )
    );
  }, []);

  // Focus the last added sticky note
  useEffect(() => {
    if (notes.length > 0 && latestNoteRef.current) {
      latestNoteRef.current.focus();
    }
  }, [notes.length]);

  // Render all sticky notes
  const renderedNotes = useMemo(
    () =>
      notes.map((note, index) => (
        <StickyNote
          key={note.id}
          note={note}
          onDelete={handleDeleteNote}
          onTextChange={handleTextChange}
          ref={index === notes.length - 1 ? latestNoteRef : null}
        />
      )),
    [notes, handleDeleteNote, handleTextChange]
  );

  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        width: "90%",
        margin: "0px auto",
        padding: "60px 0",
      }}
    >
      {/* Button to add new sticky note */}
      <button
        onClick={handleAddNote}
        style={{
          marginBottom: "10px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "background-color 0.2s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0069d9")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        ➕ Add Note
      </button>

      {/* Render PDF Viewer with highlight and layout plugins */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <DndContext onDragEnd={handleDragEnd}>
          <Viewer
            fileUrl="/Cracking-the-Coding-Interview-6th-Edition-189-Programming-Questions-and-Solutions.pdf"
            defaultScale={SpecialZoomLevel.PageWidth}
            plugins={[defaultLayoutPluginInstance, highlightPluginInstance]}
          />
          {renderedNotes}
        </DndContext>
      </Worker>
    </div>
  );
}

// (Optional) Define prop types if you're passing props externally
BookViewer.propTypes = {
  onHighlightClicked: PropTypes.func,
  highlight: PropTypes.shape({
    strings: PropTypes.arrayOf(PropTypes.string),
  }),
  id: PropTypes.string,
};
