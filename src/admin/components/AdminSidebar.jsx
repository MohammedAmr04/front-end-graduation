import { useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { FaBook, FaUser } from "react-icons/fa";
import "./AdminSidebar.css";
=======
import { FaTachometerAlt, FaBook, FaUser ,FaUsers } from "react-icons/fa";
import './AdminSidebar.css';
>>>>>>> c68abd13ef4081493c09208808b76b70745ae492

const AdminSidebar = () => {
  const [isBooksOpen, setIsBooksOpen] = useState(false);
<<<<<<< HEAD
  const [isUsersOpen, setIsUsersOpen] = useState(false);
=======
  const [isUsersOpen, setIsUsersOpen] = useState(false); 
  const [isCommunityOpen, setIsCommunityOpen] =useState(false);
>>>>>>> c68abd13ef4081493c09208808b76b70745ae492

  return (
    <div className="sidebar">
      <ul>

        <ul className="manageBook">
          <li onClick={() => setIsBooksOpen(!isBooksOpen)}>
            <FaBook />
            <span> Books</span>
            {isBooksOpen && (
              <ul>
                <li>
                  <Link to="/admin/addbook">Add Book</Link>
                </li>
                <li>
                  <Link to="/admin/managebook">Manage Books</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <ul className="manageUser">
          <li onClick={() => setIsUsersOpen(!isUsersOpen)}>
            <FaUser />
            <span> Users</span>
            {isUsersOpen && (
              <ul>
                <li>
                  <Link to="/admin/adduser">Add User</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <ul className="manage-community">
          <li onClick={()=> setIsCommunityOpen(!isCommunityOpen)}>
            <FaUsers/>
            <span>  Community</span>
            {isCommunityOpen && (
              <ul>
                <li><Link to="/admin/addcommunity">Add Community</Link></li>
                <li><Link to="/admin/managecommunity">Manage_community</Link></li>
              </ul>
            )}
          </li>
        </ul>


      </ul>
    </div>
  );
};

export default AdminSidebar;
