import axios from "axios";
const fetchData = async (url, title, symbol, API_KEY) => {
  try {
    const response = await axios.get(url);
    const data = response.data[title];
    const transformedData = Object.entries(data)
      .map(([date, values]) => ({
        date: new Date(date),
        open: parseFloat(values["1. open"]),
        high: parseFloat(values["2. high"]),
        low: parseFloat(values["3. low"]),
        close: parseFloat(values["4. close"]),
        volume: parseFloat(values["5. volume"]),
      }))
      .sort((a, b) => a.date - b.date); // sort in increasing time order
    return transformedData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchWeeklyData = async (symbol, API_KEY) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${API_KEY}`;
  return await fetchData(url, "Weekly Time Series", symbol, API_KEY);
};

export const fetchDailyData = async (symbol, API_KEY) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}&outputsize=full`;
  return await fetchData(url, "Time Series (Daily)", symbol, API_KEY);
};
