import React, { useEffect, useState } from "react";
import Stonks from "./components/Stonks";
import { fetchDailyData, fetchWeeklyData } from "./components/Stonks_api";
import DatesPicker from "./components/DatesPicker";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const symbol = "SPY"; // replace with your symbol
    const API_KEY = process.env.STONK_API_KEY;

    fetchWeeklyData(symbol, API_KEY).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <DatesPicker />
      {data && <Stonks data={data} />}
    </div>
  );
};

export default App;
