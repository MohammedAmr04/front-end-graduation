import { useState } from "react";
import { useFetchBooks } from "../../hooks/useFetchBooks";
import { useSearch } from "../../hooks/useSearch";

const Books = () => {
  // نبدأ بصفحة 1 وبـ limit 9 كتب لكل صفحة
  const [currentPage, setCurrentPage] = useState(1);
  const { books, loading, error, totalPages } = useFetchBooks(currentPage, 9);

  // إعداد البحث باستخدام custom hook الخاص بالبحث
  const [searchInput, setSearchInput] = useState("");
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
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
            Let's go to start your journey with your books!
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
          <ul className="mb-0 pagination">
            {/* زر Previous */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &laquo;
              </button>
            </li>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            {totalPages > 5 && (
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
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* === Books Grid (Cards) === */}
      <div className="container my-4">
        {loading || searchLoading ? (
          <p>Loading books...</p>
        ) : error || searchError ? (
          <p>Error loading books.</p>
        ) : booksToDisplay.length === 0 ? (
          <p className="text-center">No books found.</p>
        ) : (
          <div className="row">
            {booksToDisplay.map((book, index) => (
              <div key={index} className="mb-4 col-md-4">
                <div className="card h-100">
                  <img
                    src={book.imageUrl || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt="Book Cover"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text text-muted">{book.author}</p>
                    <p className="card-text">Category: {book.category}</p>
                    <button className="mt-auto btn btn-primary">Read</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
