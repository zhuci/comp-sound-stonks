import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Stonks from "./components/Stonks";
// import Slider from "./components/Slider";
import Slider from "@mui/material/Slider";
import AudioPlayer from "./components/AudioPlayer";
import { readData } from "./utils/readData";
import { notes_to_freq_dict } from "./utils/notes-frequencies";
import { stockDataToNotes } from "./components/helper";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const App = () => {
  const [startDate, setStartDate] = useState(dayjs("2008-09-28"));
  const [endDate, setEndDate] = useState(dayjs("2009-11-23"));
  const [data, setData] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const [sliderValue, setSliderValue] = useState(15);
  const [tempFreq, setTempFreq] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const [dataRead, noteDataRead] = readData(startDate, endDate, sliderValue);
    setData(dataRead);
    setNoteData(noteDataRead);

    let tempData = noteDataRead.map((value) => (value.high + value.low) / 2);
    let test = stockDataToNotes(tempData, notes_to_freq_dict);
    setTempFreq(test);
    setCurrentTime(0);
  }, [startDate, endDate, sliderValue]);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      {/* <DatesPicker onDateChange={handleDateChange} /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="start date"
          value={startDate}
          onChange={(newStartDate) => setStartDate(newStartDate)}
        />
        <DatePicker
          label="end date"
          value={endDate}
          onChange={(newEndDate) => setEndDate(newEndDate)}
        />
      </LocalizationProvider>
      <Slider
        value={sliderValue}
        onChange={(event, newValue) => setSliderValue(newValue)}
        min={15}
        max={100}
      />
      <Stonks data={data} notePoints={noteData} currentTime={currentTime} />
      <AudioPlayer
        frequencies={tempFreq}
        noteDuration={0.5}
        onTimeUpdate={setCurrentTime}
      />
    </div>
  );
};

export default App;
