import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUser } from "react-icons/fa";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [isBooksOpen, setIsBooksOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

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
      </ul>
    </div>
  );
};

export default AdminSidebar;
