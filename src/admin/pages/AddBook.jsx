import { useState } from "react";

import axios from "axios";
import "./AddBook.css";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handeleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title: formData.title,
      author: formData.author,
      category: formData.category,
      description: formData.description,
      content: formData.content,
    };

    try {
      const res = await axios.post("http://localhost:5000/books", newBook);

      if (res.status == 201) {
        alert("Book Added Successfully");
        setFormData({
          title: "",
          author: "",
          category: "",
          description: "",
          content: "",
        });
      }
    } catch (error) {
      console.error("Error adding book", error);
      alert("Failed adding book");
    }
  };

  return (
    <div className="addBook">
      <h2>Add New book</h2>
      <form onSubmit={handeleSubmit}>
        <div>
          <label>Book Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Auther</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Book Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Book Content</label>
          <textarea
            value={formData.content}
            name="content"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddBook;
