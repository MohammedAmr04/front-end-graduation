import React, { useState } from "react";
import axios from "axios";
import "./AddCommunity.css";

const AddCommunity = () => {
    const [communities, setCommunities] = useState({
        name: "",
    });

    const handleChange = (e) => {
        setCommunities({ ...communities, [e.target.name]: e.target.value });
    };

    const handleAddCommunity = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/communities", communities);
            console.log("Community added");
            setCommunities({ name: "" }); 
        } catch (error) {
            console.error("Failed adding community", error);
        }
    };

    return (
        <div className="add-community">
            <h2>Add Community</h2>
            <form onSubmit={handleAddCommunity} className="form-container">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={communities.name}
                    onChange={handleChange}
                    placeholder="Enter community name"
                    required
                />
                <button type="submit" className="submit-btn">
                    Add Community
                </button>
            </form>
        </div>
    );
};

export default AddCommunity;
