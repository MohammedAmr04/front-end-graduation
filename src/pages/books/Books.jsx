import { useState } from "react";
import { useFetchBooks } from "../../hooks/useFetchBooks";
import { useSearch } from "../../hooks/useSearch";
import "./styles.css";
import Loader from "./../../components/common/loader/Loader";
import BookCard from "./../../components/common/card/BookCard";

const Books = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { books, loading, error, totalPages } = useFetchBooks(currentPage, 12);
  const [searchInput, setSearchInput] = useState("");
  const [isPageChanging, setIsPageChanging] = useState(false);

  const {
    results,
    loading: searchLoading,
    error: searchError,
    search,
  } = useSearch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      search(searchInput);
    }
  };

  const booksToDisplay = results.length > 0 ? results : books;

  const handlePageChange = (newPage) => {
    if (isPageChanging || newPage < 1 || newPage > totalPages) return;

    setIsPageChanging(true);
    setCurrentPage(newPage);

    setTimeout(() => {
      setIsPageChanging(false);
    }, 1000);
  };

  return (
    <div>
      {/* === Hero Section with Search === */}
      <section
        className="text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1512820790803-83ca734da794")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            padding: "30px",
            borderRadius: "8px",
            backdropFilter: "blur(4px)",
          }}
        >
          <h3 className="mb-4">
            {`Let's go to start your journey with your books!`}
          </h3>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for a book..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ maxWidth: "400px", margin: "0 auto" }}
            />
          </form>
        </div>
      </section>

      {/* === Control Bar: Filter and Pagination UI === */}
      <div className="container gap-3 p-3 d-flex flex-column flex-md-row justify-content-between align-items-center bg-light border-bottom">
        {/* Filter by Category */}
        <div className="gap-2 d-flex align-items-center">
          <label htmlFor="category" className="mb-0 fw-semibold">
            Filter by:
          </label>
          <select
            name="category"
            id="category"
            className="form-select"
            style={{ width: "200px" }}
          >
            <option value="All">All</option>
            <option value="Science">Science</option>
            <option value="Drama">Drama</option>
            <option value="Sport">Sport</option>
          </select>
        </div>

        {/* Pagination Controls */}
        <nav>
          <ul className="gap-1 mb-0 pagination">
            {/* Previous Button */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isPageChanging}
              >
                &laquo;
              </button>
            </li>

            {/* Dynamic Pages */}
            {(() => {
              const startPage = Math.max(currentPage - 2, 1);
              const endPage = Math.min(currentPage + 2, totalPages);
              const pages = [];

              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <li
                    key={i}
                    className={`page-item ${currentPage === i ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i)}
                      disabled={isPageChanging}
                    >
                      {i}
                    </button>
                  </li>
                );
              }

              return pages;
            })()}

            {/* Ellipsis if there are more pages */}
            {currentPage + 2 < totalPages && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}

            {/* Next Button */}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isPageChanging}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* === Books Grid (Cards) === */}
      <div className="container my-4 position-relative">
        {(loading || searchLoading) && <Loader />}
        {error || searchError ? (
          <p>Error loading books.</p>
        ) : booksToDisplay.length === 0 ? (
          <p className="text-center">No books found.</p>
        ) : (
          <div className="flex-wrap gap-4 mx-auto d-flex ">
            {booksToDisplay.map((book) => (
              <div
                key={book.id}
                className="mx-auto mb-4 "
                style={{ width: "260px" }}
              >
                <BookCard item={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
