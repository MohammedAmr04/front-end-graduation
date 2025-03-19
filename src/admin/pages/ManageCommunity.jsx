import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import './ManageCommunity.css'

const ManageCommunity =() =>{
    const [communities, setCommunities] = useState([]);
    const [editCommunity,setEditCommunity] = useState(null);
    const [updateCommunity, setUpdateCommunity] = useState({
        name :"",
    });

    //get all communities//
    useEffect (() =>{
        axios
        .get("http://localhost:5000/communities")
        .then((response) =>{
        setCommunities(response.data)})
        .catch((error)=> {
            console.error("Failed fetching data",error);
        }, []);
    })

    //edit comminity//
    const handleEdit = (communities) =>{
        setEditCommunity(communities.id);
        setUpdateCommunity(communities);
    };

    const handleUpdate = (e) =>{
        setUpdateCommunity ({...updateCommunity, [e.target.name]: e.target.value});
    };


    //save edidts//
    const handleSave = async () => {
        try {
          await axios.put(
            `http://localhost:5000/communities/${editCommunity}`,
            updateCommunity
          );
          setCommunities(
            communities.map((communities) =>
              communities.id === editCommunity ? updateCommunity : communities
            )
          );
          setEditCommunity(null);
          alert("community updated");
        } catch (error) {
          console.error("Error updating community", error);
        }
      };

      const handleCancel = () => {
        setEditCommunity(null);
      };


      const handleDelete = (id) => {
        axios
          .delete(`http://localhost:5000/communities/${id}`)
          .then(() => {
            setCommunities(communities.filter((communities) => communities.id !== id));
            alert("community deleted succesfully");
          })
          .catch((error) => {
            console.error("Error deleting community:", error);
          });}

    return (
        <div className="managecommunities">
      <h2>Manage Communities</h2>
      <table>
       <thead>
           <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {communities.map((communities) => (
      <tr key={communities.id}>
        <td>{communities.id}</td>
        <td>{communities.name}</td>
        <td>
          <button className="edit-btn" onClick={() => handleEdit(communities)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => handleDelete(communities.id)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  {editCommunity && (
  <div className="edit-form">
    <h3>Edit Community</h3>
    <label>Community Name:</label>
    <input
      type="text"
      name="name"
      value={updateCommunity.name}
      onChange={handleUpdate}
    />
    <div className="form-buttons">
      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
      <button className="cancel-btn" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  </div>
)}
</div>
    ) 
    
} 

export default ManageCommunity;