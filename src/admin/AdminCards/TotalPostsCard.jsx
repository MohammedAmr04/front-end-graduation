import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TotalPostsCard.css";

const TotalPostsCard = () => {
  const [postsCount, setPostsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/posts")
      .then((res) => setPostsCount(res.data.length))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const goToManageUsers = () => {
    navigate("/admin/manageposts");
  };

  return (
    <div className="postsCard" onClick={goToManageUsers}>
      <h4  >
          Total Posts
      </h4>
      <div className="postsCount"><CountUp end={postsCount} duration={2} /></div>
    </div>
  );
};

export default TotalPostsCard;
