import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const Stonks = ({ data, notePoints, currentTime }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  data = data.map((item) => {
    const notePoint = notePoints.find(
      (note) => note.datetime_str === item.datetime_str
    );
    return notePoint ? { ...item, note: notePoint.close } : item;
  });

  let filteredData = data.filter((item) => item.note !== undefined);
  let currentDatetimeStr = filteredData[currentTime]?.datetime_str;

  return (
    <div className="w-3/4">
      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="datetime_str"
            tickFormatter={formatDate}
            minTickGap={25}
            interval="preserveStart"
          />
          <YAxis type="number" domain={["auto", "auto"]} />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            dot={{ fill: "#8884d8", r: 0 }}
          />
          <Line
            connectNulls
            type="monotone"
            dataKey="note"
            stroke="#82ca9d"
            dot={{ fill: "#82ca9d", r: 4 }}
          />
          <ReferenceLine x={currentDatetimeStr} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Stonks;
