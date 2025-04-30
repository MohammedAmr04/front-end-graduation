import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageBook.css";

const ManageBook = () => {
  const [books, setBooks] = useState([]);
  const [editBook, seteditBook] = useState(null);
  const [updateBook, setupdateBook] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    content: "",
  });

  // Fetch books from API
  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data);
        console.log("Data fetched:", response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // Edit function
  const handleEdit = (book) => {
    seteditBook(book.id);
    setupdateBook(book);
  };

  // Handle input changes
  const handleUpdate = (e) => {
    setupdateBook({ ...updateBook, [e.target.name]: e.target.value });
  };

  // Save updated book
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/books/${editBook}`, updateBook);
      setBooks(
        books.map((book) => (book.id === editBook ? updateBook : book))
      );
      seteditBook(null);
    } catch (error) {
      console.error("Error updating book", error);
    }
  };

  // Delete book
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <div className="managebooks">
      <h2>Manage Books</h2>
      <table className="allBooks">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.description}</td>
              <td>
                <button className="editBook-btn" onClick={() => handleEdit(book)}>Edit</button>
                <button className="deleteBook-btn" onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editBook && (
        <div className="editBook-form">
          <h3>Edit Book</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <input type="text" name="title" value={updateBook.title} onChange={handleUpdate} placeholder="Title" />
            <input type="text" name="author" value={updateBook.author} onChange={handleUpdate} placeholder="Author" />
            <input type="text" name="category" value={updateBook.category} onChange={handleUpdate} placeholder="Category" />
            <textarea name="description" value={updateBook.description} onChange={handleUpdate} placeholder="Description"></textarea>
            <textarea name="content" value={updateBook.content} onChange={handleUpdate} placeholder="Content"></textarea>
            <button className="saveBook" type="submit">Save</button>
            <button type="button" onClick={() => seteditBook(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageBook;
