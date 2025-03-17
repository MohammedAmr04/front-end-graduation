import React from "react"
import { useState ,useEffect } from "react"

import axios from "axios"
import'./AddBook.css'

const AddBook = () => {
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [bookContent , setBookContent] = useState("");

    const[books, setBooks] = useState([]);

    const handeleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            title: bookTitle,
            author: bookAuthor,
            category: category,
            description: bookDescription,
            content : bookContent,
        };
        
        try  {
            const res = await axios.post("http://localhost:5000/books",newBook);

            if(res.status==201){
                alert("Book Added Successfully");
                setBookTitle(" ");
                setBookAuthor(" ");
                setCategory(" ");
                setBookDescription(" ");
                setBookContent(" ");
            }
        } catch (error) {
            console.error("Error adding book",error);
            alert("Failed adding book");
        }}

    return (
        <div className="add">
           <h2>Add New book</h2>
           <form onSubmit={handeleSubmit}>
            <div>
                <label>Book Title</label>
                <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                required
                />
            </div>
            <div>
            <label>Auther</label>
            <input 
            type="text"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            required
            />
            </div>
            <div>
                <label>Category</label>
                <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                />
            </div>
            <div>
                <label>Book Description</label>
                <input
                type="text"
                value={bookDescription}
                onChange={(e) => setBookDescription(e.target.value)}
                required
                />
            </div>
            <div>
                <label>Book Content</label>
                <textarea
                value={bookContent}
                onChange={(e)=> setBookContent(e.target.value)}
                required
                ></textarea>
            </div>
            <button className="submitButton" type="submit">Submit</button>
           </form>
           

           
        </div>
        
        
    )

}
export default AddBook;
