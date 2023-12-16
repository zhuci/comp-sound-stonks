import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Stonks from "./components/Stonks";
// import Slider from "./components/Slider";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AudioPlayer from "./components/AudioPlayer";
import { readData } from "./utils/readData";
import { notes_to_freq_dict, scale_to_notes } from "./utils/notes-frequencies";
import { dataToNotes, keyRangeToFreq } from "./utils/dataToNotes";
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

    // testing
    keyRangeToFreq("Ab", 1, 3, notes_to_freq_dict, scale_to_notes);

    setNoteData(newNoteData);
    setCurrentTime(0);
  }, [startDate, endDate, sliderValue]);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  // TODO ellen: remove the weird box/stack stuff and use tailwind
  return (
    <Box padding={2}>
      {/* <DatesPicker onDateChange={handleDateChange} /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" spacing={2} marginBottom={2}>
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
        </Stack>
      </LocalizationProvider>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Typography id="number-of-notes" gutterBottom>
          Number of notes
        </Typography>
        <Box width={300} marginLeft={2}>
          <Slider
            value={sliderValue}
            onChange={(event, newValue) => setSliderValue(newValue)}
            min={15}
            max={100}
          />
        </Box>
      </Box>
      <Box marginBottom={2}>
        <Stonks data={data} notePoints={binnedData} currentTime={currentTime} />
      </Box>
      <AudioPlayer
        noteData={noteData}
        noteDuration={0.5}
        audioContext={audioContext}
        onTimeUpdate={setCurrentTime}
      />
    </Box>
  );
};

export default App;
