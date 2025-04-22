import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Book.module.css"; // Importing the CSS module
import BookSlider from "./../book-slider/BookSlider";

const fakeBooks = {
  1: {
    title: "Whispers of the Forgotten",
    author: "Elena Voss",
    rate: 4.5,
    category: "Mystery, Thriller",
    summary:
      "A gripping tale of an investigative journalist uncovering secrets buried in a seemingly quiet town, leading to a chain of unexpected events.",
    cover: "https://www.gutenberg.org/cache/epub/36/pg36.cover.medium.jpg",
  },
  2: {
    title: "Dreams in Digital",
    author: "Marcus Reed",
    rate: 4.2,
    category: "Sci-Fi, Cyberpunk",
    summary:
      "In a future where consciousness can be uploaded, one man's search for his missing sister uncovers a shocking conspiracy.",
    cover: "https://www.gutenberg.org/cache/epub/36/pg36.cover.medium.jpg",
  },
  3: {
    title: "The Paper Garden",
    author: "Clara Bennett",
    rate: 4.8,
    category: "Drama, Romance",
    summary:
      "A young widow finds solace and new purpose in restoring a forgotten botanical garden, where every plant tells a story.",
    cover: "https://www.gutenberg.org/cache/epub/36/pg36.cover.medium.jpg",
  },
};

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Simulating a fetch from local data
    const foundBook = fakeBooks[id];
    setBook(foundBook);
  }, [id]);

  if (!book) return <p style={{ textAlign: "center" }}>Book not found.</p>;

  return (
    <main>
      <div className={styles.bookDetailsCard} data-aos="fade-up">
        <div>
          <img
            src={book.cover}
            alt={book.title}
            className={styles.bookCover}
            data-aos="zoom-in"
          />
          <div className="gap-3 pt-3 d-flex justify-content-center ">
            <button className="button button-second">Download</button>
            <button className="button button-primary">Read</button>
          </div>
        </div>
        <div className={styles.bookDetails}>
          <div>
            <h2>{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Category:</strong> {book.category}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {book.rate}
            </p>
          </div>
          <div data-aos="fade-left" data-aos-delay="300">
            <h4>Summary</h4>
            <p style={{ textAlign: "justify" }}>{book.summary}</p>
          </div>
        </div>
      </div>
      <section>
        <BookSlider />
      </section>
    </main>
  );
};

export default Book;
