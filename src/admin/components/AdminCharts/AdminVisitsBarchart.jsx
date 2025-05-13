import React from "react";
import "./AdminVisitBarchart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
    // { year: "2021", Jan: 120, Feb: 210, Mar: 160,April: 500,May:100 ,june: 160 ,july: 160, Augast: 300 },
    // { year: "2022", Jan: 200, Feb: 300, Mar: 250 },
    // { year: "2023", Jan: 180, Feb: 260, Mar: 300,April: 500,May:100 ,june: 160 ,july: 160, Augast: 300 },
    // { year: "2024", Jan: 120, Feb: 210, Mar: 160,April: 500,May:100 ,june: 160 ,july: 160, Augast: 300 },
    { year: "2025", Jan: 120, Feb: 210, Mar: 160,April: 500,May:100  },
  ];

  const colors = [
    "#A3CEF1", // January - blue-ish
    "#BFD8B8", // February - soft green
    "#F5D491", // March - light amber
    "#F2B5D4", // April - pink pastel
    "#C4C1E0", // May - soft lavender
    "#FFE5B4", // June - peach
    "#D1E8E2", // July - mint
    "#EAD5DC", // August - blush
    "#B5D6C3", // September - pale teal
    "#F9C6B3", // October - coral
    "#D3E4CD", // November - pale green
    "#CDE7F0", // December - icy blue
  ];

  const VisitsChart = () => {
    return (
      <div className="barchart">
        <h2 >Visits Per Month & Year</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Jan" fill={colors[0]} />
            <Bar dataKey="Feb" fill={colors[1]}/>
            <Bar dataKey="Mar" fill={colors[2]} />
            <Bar dataKey="April" fill={colors[3]} />
            <Bar dataKey="May" fill={colors[4]} />
            <Bar dataKey="june" fill={colors[5]} />
            <Bar dataKey="july" fill={colors[6]} />
            <Bar dataKey="Augast" fill={colors[7]} />
            <Bar dataKey="September" fill={colors[8]}/>
            <Bar dataKey="october" fill={colors[9]} />
            <Bar dataKey="November" fill={colors[10]} />
            <Bar dataKey="December" fill={colors[11]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default VisitsChart;

  
