import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

const CustomLabel = ({ viewBox, value }) => {
  const { x, y, width, height } = viewBox;

  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      fill="#82ca9d"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
};

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
    return notePoint
      ? { ...item, filtered: notePoint.close, note: notePoint.note }
      : item;
  });

  let filteredData = data.filter((item) => item.filtered !== undefined);
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
          ></XAxis>
          <YAxis type="number" domain={["auto", "dataMax + 15"]} />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            dot={{ fill: "#8884d8", r: 0 }}
          />
          <Line
            connectNulls
            type="monotone"
            dataKey="filtered"
            stroke="#82ca9d"
            dot={{ fill: "#82ca9d", r: 4 }}
          />
          <ReferenceLine x={currentDatetimeStr} stroke="#82ca9d" />
          {filteredData.map((entry, index) =>
            index === currentTime ? (
              <ReferenceDot
                key={`tooltip-${index}`}
                x={entry.datetime_str}
                y={entry.close + 15}
                stroke="white"
                fill="white"
                isFront={true}
                label={<CustomLabel value={`${entry.note}`} />}
                shape={({ cx, cy }) => (
                  <circle cx={cx} cy={cy} r={20} fill="white" />
                )}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Stonks;
