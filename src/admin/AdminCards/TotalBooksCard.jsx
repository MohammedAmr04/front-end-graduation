import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
import { FaTachometerAlt, FaBook, FaUser ,FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./TotalBooksCard.css";

const TotalBooksCard = () => {
  const [bookCount, setBooksCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then((res) => setBooksCount(res.data.length))
      .catch((err) => console.error("Error fetching Books:", err));
  }, []);

  const goToManageBooks = () => {
    navigate("/admin/managebook");
  };

  return (
    <div className="booksCard" onClick={goToManageBooks}>
      <h4  >
        <FaBook/>  Total Books
      </h4>
      <div className="booksCount"><CountUp end={bookCount} duration={2} /></div>
    </div>
  );
};

export default TotalBooksCard;
