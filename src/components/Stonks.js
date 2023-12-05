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

  const getFirstDaysOfMonth = () => {
    const firstDays = [];
    let minDate = new Date(Math.min(...data.map((item) => item.date)));
    let maxDate = new Date(Math.max(...data.map((item) => item.date)));

    while (minDate <= maxDate) {
      firstDays.push(
        new Date(minDate.getFullYear(), minDate.getMonth(), 1).getTime()
      );
      minDate.setMonth(minDate.getMonth() + 1);
    }

    console.log(firstDays);

    return firstDays;
  };

  return (
    <LineChart width={800} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        // ticks={["2008-01-01", "2018-01-01"]}
        tickFormatter={formatDate}
        // padding={{ right: 100 }}
        //
      />
      <YAxis />
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
