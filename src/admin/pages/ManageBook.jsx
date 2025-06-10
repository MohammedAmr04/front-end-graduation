import { useState } from "react";
import { useFetchBooks } from "../../hooks/useFetchBooks";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ManageBook.css";

const PAGE_SIZE = 10;

const ManageBook = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { books, loading, error, totalPages } = useFetchBooks(
    currentPage,
    PAGE_SIZE
  );
  const [editBook, seteditBook] = useState(null);
  const [updateBook, setupdateBook] = useState({
    title: "",
    author: "",
    category: "",
    summary: "",
    // cover will be handled separately
  });
  const [coverFile, setCoverFile] = useState(null);

  // Edit function
  const handleEdit = (book) => {
    seteditBook(book.id);
    setupdateBook({
      title: book.title,
      author: book.author,
      category: book.category,
      summary: book.summary,
    });
    setCoverFile(null);
  };

  // Handle input changes
  const handleUpdate = (e) => {
    setupdateBook({ ...updateBook, [e.target.name]: e.target.value });
  };

  // Handle cover file change
  const handleCoverChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  // Save updated book
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("title", updateBook.title);
      data.append("author", updateBook.author);
      data.append("category", updateBook.category);
      data.append("summary", updateBook.summary);
      if (coverFile) data.append("cover", coverFile);
      const token = localStorage.getItem("token");
      await axios.put(`https://localhost:7159/api/Books/${editBook}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      // No need to update books state directly, just refresh page
      seteditBook(null);
      setCoverFile(null);
    } catch (error) {
      console.error("Error updating book", error);
    }
  };

  // Delete book
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://localhost:7159/api/Books/${id}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
      .then(() => {
        // No need to update books state directly, just refresh page
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  // Pagination controls
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="py-5 managebooks-page-bg">
      <div className="container">
        <div className="p-4 mx-auto managebooks-card">
          <div className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
            <h2 className="mb-0">Manage Books</h2>
            {/* Pagination top right on desktop */}
            <nav className="pagination-nav d-none d-md-block">
              <ul className="mb-0 pagination justify-content-end">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &laquo;
                  </button>
                </li>
                {(() => {
                  const startPage = Math.max(currentPage - 2, 1);
                  const endPage = Math.min(currentPage + 2, totalPages);
                  const pages = [];
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(i)}
                        >
                          {i}
                        </button>
                      </li>
                    );
                  }
                  return pages;
                })()}
                {currentPage + 2 < totalPages && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading books.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="allBooks modern-table">
                  <thead>
                    <tr>
                      <th>Cover</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id}>
                        <td>
                          {
                            <img
                              src={`https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`}
                              alt={book.title}
                              className="book-cover-img"
                            />
                          }
                        </td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td>
                          <button
                            className="editBook-btn icon-btn"
                            onClick={() => handleEdit(book)}
                            aria-label="Edit Book"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="deleteBook-btn icon-btn"
                            onClick={() => handleDelete(book.id)}
                            aria-label="Delete Book"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination bottom center on mobile */}
              <nav className="mt-4 pagination-nav d-block d-md-none">
                <ul className="mb-0 pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &laquo;
                    </button>
                  </li>
                  {(() => {
                    const startPage = Math.max(currentPage - 2, 1);
                    const endPage = Math.min(currentPage + 2, totalPages);
                    const pages = [];
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <li
                          key={i}
                          className={`page-item ${
                            currentPage === i ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(i)}
                          >
                            {i}
                          </button>
                        </li>
                      );
                    }
                    return pages;
                  })()}
                  {currentPage + 2 < totalPages && (
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  )}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}

          {editBook && (
            <div
              className="modal-overlay"
              onClick={(e) => {
                if (e.target.classList.contains("modal-overlay"))
                  seteditBook(null);
              }}
            >
              <div className="modal-content">
                <button
                  className="modal-close"
                  onClick={() => seteditBook(null)}
                  aria-label="Close Edit Modal"
                >
                  &times;
                </button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  encType="multipart/form-data"
                >
                  <input
                    type="text"
                    name="title"
                    value={updateBook.title}
                    onChange={handleUpdate}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    name="author"
                    value={updateBook.author}
                    onChange={handleUpdate}
                    placeholder="Author"
                  />
                  <input
                    type="text"
                    name="category"
                    value={updateBook.category}
                    onChange={handleUpdate}
                    placeholder="Category"
                  />
                  <textarea
                    name="summary"
                    value={updateBook.summary}
                    onChange={handleUpdate}
                    placeholder="Summary"
                  ></textarea>
                  <input
                    type="file"
                    name="cover"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                  <button className="saveBook" type="submit">
                    Save
                  </button>
                  <button type="button" onClick={() => seteditBook(null)}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBook;
