import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./PostsDonutChart.css"; 

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a0522d", "#8a2be2", "#00ced1", "#ff69b4"];

const PostsDonutChart = () => {
  const [chartData, setChartData] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, communitiesRes] = await Promise.all([
          axios.get("http://localhost:5000/postsCount"),
          axios.get("http://localhost:5000/communities"),
        ]);

        const postsCount = postsRes.data;
        const communities = communitiesRes.data;

        const data = postsCount.map((item) => {
          const community = communities.find((c) => c.id == item.communityID);
          return {
            name: community ? community.name : "Unknown",
            value: item.postCount,
          };
        });

        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="donut-chart">
      <h3 >Posts summary</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PostsDonutChart;
