import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Stonks from "./components/Stonks";
// import Slider from "./components/Slider";
import Slider from "@mui/material/Slider";
import AudioPlayer from "./components/AudioPlayer";
import { readData } from "./utils/readData";
import { notes_to_freq_dict } from "./utils/notes-frequencies";
import { dataToNotes } from "./utils/dataToNotes";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const App = () => {
  const [startDate, setStartDate] = useState(dayjs("2008-09-28"));
  const [endDate, setEndDate] = useState(dayjs("2009-11-23"));
  const [data, setData] = useState([]);
  const [binnedData, setBinnedData] = useState([]);
  const [sliderValue, setSliderValue] = useState(15);
  const [noteData, setNoteData] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  // create audioCtx and global gain
  const [audioContext, setAudioContext] = useState(null);
  // const [globalGain, setGlobalGain] = useState(null);

  if (!audioContext) {
    const newAudioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    setAudioContext(newAudioContext);
    // const newGlobalGain = newAudioContext.createGain();
    // newGlobalGain.gain.setValueAtTime(0.7, newAudioContext.currentTime);
    // newGlobalGain.connect(newAudioContext.destination);;
    // setGlobalGain(globalGain);
  } else {
    // If AudioContext is suspended, resume it
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  }

  useEffect(() => {
    const [dataRead, binnedDataRead] = readData(
      startDate,
      endDate,
      sliderValue
    );
    setData(dataRead);
    setBinnedData(binnedDataRead);

    let closeBinnedData = binnedDataRead.map((value) => value.close);
    let newNoteData = dataToNotes(closeBinnedData, notes_to_freq_dict);
    console.log("newNoteData", newNoteData);
    setNoteData(newNoteData);
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
      <Stonks data={data} notePoints={binnedData} currentTime={currentTime} />
      <AudioPlayer
        noteData={noteData}
        noteDuration={0.5}
        audioContext={audioContext}
        onTimeUpdate={setCurrentTime}
      />
    </div>
  );
};

export default App;
