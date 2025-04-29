import { SpecialZoomLevel, Worker, Viewer } from "@react-pdf-viewer/core";
import { RenderPage } from "../components/common/book-veiwer-pdf/water-mark/RenderPage";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useMemo,
  memo,
  useCallback,
} from "react";
import { DndContext, useDraggable, PointerSensor } from "@dnd-kit/core";
import PropTypes from "prop-types";
import styles from "./Test.module.css";

// Memoized DraggableNote component
const DraggableNote = memo(
  forwardRef(({ note, onDelete, onTextChange }, ref) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: note.id,
        sensors: [
          {
            sensor: PointerSensor,
            options: {
              activationConstraint: {
                delay: 100,
                tolerance: 5,
              },
            },
          },
        ],
      });

    const style = {
      position: "absolute",
      left: `${note.x}px`,
      top: `${note.y}px`,
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : "none",
      background: "linear-gradient(145deg, #fffecb, #f7f3a6)",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "12px",
      width: "180px",
      zIndex: isDragging ? 1000 : 10,
      boxShadow: "3px 3px 8px rgba(0,0,0,0.15)",
      cursor: isDragging ? "grabbing" : "grab",
      transition: isDragging
        ? "none"
        : "transform 0.2s ease, box-shadow 0.2s ease",
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={styles.note}
        aria-label={`Note ${note.id}`}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <strong
            style={{
              fontSize: "14px",
              color: "#333",
              cursor: "move",
              padding: "2px 4px",
              borderRadius: "4px",
              background: "rgba(0,0,0,0.05)",
            }}
            {...listeners}
            {...attributes}
            aria-label="Drag handle"
          >
            Move
          </strong>
          <button
            onClick={() => onDelete(note.id)}
            style={{
              background: "none",
              border: "none",
              color: "#e63946",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              padding: "0 4px",
            }}
            aria-label="Delete note"
          >
            ❌
          </button>
        </div>
        <textarea
          ref={ref}
          value={note.text ?? ""}
          onChange={(e) => onTextChange(note.id, e.target.value)}
          rows={3}
          placeholder="New Note"
          style={{
            width: "100%",
            resize: "none",
            background: "transparent",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "14px",
            outline: "none",
            borderStyle: "none",
            padding: "6px",
            color: "#333",
          }}
          aria-label="Note text"
        />
      </div>
    );
  })
);

DraggableNote.displayName = "DraggableNote";

DraggableNote.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
};

// Main component with memoized callbacks
export default function Test() {
  const [notes, setNotes] = useState([]);
  const latestNoteRef = useRef(null);

  // Memoized handlers
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

  // Focus the latest note
  useEffect(() => {
    if (notes.length > 0 && latestNoteRef.current) {
      latestNoteRef.current.focus();
    }
  }, [notes.length]);

  // Memoized notes list to prevent unnecessary re-renders
  const renderedNotes = useMemo(
    () =>
      notes.map((note, index) => (
        <DraggableNote
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
        height: "90%",
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
            fileUrl="/Mohammed Amr Cv.pdf"
            defaultScale={SpecialZoomLevel.PageWidth}
            renderPage={RenderPage}
          />
          {renderedNotes}
        </DndContext>
      </Worker>
    </div>
  );
}

Test.propTypes = {};
