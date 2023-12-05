import React, { useState, useEffect } from "react";
import Stonks from "./components/Stonks";
import DatesPicker from "./components/DatesPicker";
import Slider from "./components/Slider";
import { readData } from "./utils/readData";

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2008-09-27"));
  const [endDate, setEndDate] = useState(new Date("2009-11-23"));
  const [data, setData] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const [sliderValue, setSliderValue] = useState(15);

  useEffect(() => {
    const [dataRead, noteDataRead] = readData(startDate, endDate, sliderValue);
    setData(dataRead);
    setNoteData(noteDataRead);
  }, [startDate, endDate, sliderValue]);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <DatesPicker onDateChange={handleDateChange} />
      <Slider
        min={15}
        max={100}
        value={sliderValue}
        onChange={setSliderValue}
      />
      <Stonks data={data} />
    </div>
  );
};

export default App;
