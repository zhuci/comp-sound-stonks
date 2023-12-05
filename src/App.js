import React, { useEffect, useState } from "react";
import Stonks from "./components/Stonks";
import { fetchData } from "./components/Stonks_api";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const symbol = "SPY"; // replace with your symbol
    const API_KEY = process.env.STONK_API_KEY;

    fetchData(symbol, API_KEY).then((data) => {
      setData(data);
    });
  }, []);

  return <div>{data && <Stonks data={data} />}</div>;
};

export default App;
