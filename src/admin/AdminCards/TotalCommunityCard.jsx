import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
import { FaTachometerAlt, FaBook, FaUser ,FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./TotalCommunityCard.css";

const TotalCommunityCard = () => {
  const [communityCount, setCommunityCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/communities")
      .then((res) => setCommunityCount(res.data.length))
      .catch((err) => console.error("Error fetching community:", err));
  }, []);

  const goToManageCommunity = () => {
    navigate("/admin/managecommunity");
  };

  return (
    <div className="totalcommunitiesCard" onClick={goToManageCommunity}>
      <h4  >
        <FaUsers/>  Total communities
        
      </h4>
      <div className="communitiesCount"><CountUp end={communityCount} duration={2} /></div>
    </div>
  );
};

export default TotalCommunityCard;