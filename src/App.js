import React, { useState, useEffect } from "react";
import Stonks from "./components/Stonks";
import DatesPicker from "./components/DatesPicker";
import Slider from "./components/Slider";
import AudioPlayer from "./components/AudioPlayer"
import { readData } from "./utils/readData";
import { notes_to_freq_dict } from "./utils/notes-frequencies"
import { stockDataToNotes } from "./components/helper";

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2008-09-28"));
  const [endDate, setEndDate] = useState(new Date("2009-11-23"));
  const [data, setData] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const [sliderValue, setSliderValue] = useState(15);
  const [tempFreq, setTempFreq] = useState(null);

  useEffect(() => {
    const [dataRead, noteDataRead] = readData(startDate, endDate, sliderValue);
    setData(dataRead);
    setNoteData(noteDataRead);
    
    let tempData = data.slice(1,16).map(value => (value.high + value.low) / 2)
    let test = stockDataToNotes(tempData, notes_to_freq_dict);
    setTempFreq(test)

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
      <AudioPlayer frequencies={tempFreq} noteDuration={0.5}/>
    </div>
  );
};

export default App;
