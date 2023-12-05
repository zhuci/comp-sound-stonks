import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const Stonks = ({ data }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  return (
    <LineChart width={800} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="datetime_str"
        tickFormatter={formatDate}
        minTickGap={25}
        interval="preserveStartEnd"
      />
      <YAxis type="number" domain={["auto", "auto"]} />
      <Line
        type="monotone"
        dataKey="close"
        stroke="#8884d8"
        dot={{ fill: "#8884d8", r: 0 }}
      />
    </LineChart>
  );
};

export default Stonks;
