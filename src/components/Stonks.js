import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Stonks = ({ data }) => {
  const transformedData = Object.entries(data["Weekly Time Series"]).map(
    ([date, value]) => ({
      name: date,
      value: parseFloat(value["4. close"]),
    })
  );

  return (
    <LineChart width={400} height={300} data={transformedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};

export default Stonks;
