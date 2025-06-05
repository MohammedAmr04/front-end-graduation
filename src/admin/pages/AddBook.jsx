import { useState } from "react";
import axios from "axios";
import { useToast } from "../../hooks/useToast";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    summary: "",
  });
  const [contentFile, setContentFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const { showSuccess, showError } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "content") setContentFile(files[0]);
    if (name === "cover") setCoverFile(files[0]);
  };

  const handeleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("summary", formData.summary);
    if (contentFile) data.append("content", contentFile);
    if (coverFile) data.append("cover", coverFile);
    try {
      // Get token from localStorage (adjust if you use a different method)
      const token = localStorage.getItem("token");
      const res = await axios.post("https://localhost:7159/api/Books", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (res.status === 201 || res.status === 200) {
        showSuccess("Book Added Successfully");
        setFormData({
          title: "",
          author: "",
          category: "",
          description: "",
          summary: "",
        });
        setContentFile(null);
        setCoverFile(null);
      }
    } catch (error) {
      console.error("Error adding book", error);
      showError("Failed adding book");
    }
  };

  return (
    <div
      className="py-5 addBook"
      style={{ minHeight: "100vh", background: "#f5f7fa" }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <form
          className="form-container p-5 mx-auto mt-4"
          onSubmit={handeleSubmit}
          style={{ width: "100%", maxWidth: 500 }}
          encType="multipart/form-data"
        >
          <p className="mb-4 text-center fw-bold fs-4">Add New Book</p>
          <div className="mb-4">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter book title"
              aria-label="Book Title"
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter author name"
              aria-label="Author"
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter book category"
              aria-label="Category"
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description">Book Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter book description"
              aria-label="Book Description"
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter book summary"
              aria-label="Summary"
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content">Book Content (PDF)</label>
            <input
              type="file"
              id="content"
              name="content"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="form-control"
              aria-label="Book Content PDF"
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cover">Book Cover (Image)</label>
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="form-control"
              aria-label="Book Cover Image"
              aria-required="true"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddBook;
