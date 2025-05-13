import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
import { FaUser  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./TotalUsersCard.css";

const TotalUsersCard = () => {
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => setUserCount(res.data.length))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const goToManageUsers = () => {
    navigate("/admin/manageusers");
  };

  return (
    <div className="usersCard" onClick={goToManageUsers}>
      <h4  >
        <FaUser/>  Total users
      </h4>
      <div className="usersCount"><CountUp end={userCount} duration={2} /></div>
    </div>
  );
};

export default TotalUsersCard;
