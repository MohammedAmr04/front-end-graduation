import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { RenderPage } from "../components/common/book-veiwer-pdf/water-mark/RenderPage";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import { DndContext } from "@dnd-kit/core";
import StickyNote from "./../components/common/stickynotes/StickyNote";

export default function Test() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [notes, setNotes] = useState([]);
  const latestNoteRef = useRef(null);

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

  useEffect(() => {
    if (notes.length > 0 && latestNoteRef.current) {
      latestNoteRef.current.focus();
    }
  }, [notes.length]);

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

      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <DndContext onDragEnd={handleDragEnd}>
          <Viewer
            fileUrl="/Cracking-the-Coding-Interview-6th-Edition-189-Programming-Questions-and-Solutions.pdf"
            defaultScale={SpecialZoomLevel.PageWidth}
            // renderPage={RenderPage}
            plugins={[defaultLayoutPluginInstance]}
          />
          {renderedNotes}
        </DndContext>
      </Worker>
    </div>
  );
}
