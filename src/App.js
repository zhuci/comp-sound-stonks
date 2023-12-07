import React, { useState, useEffect } from "react";
import Stonks from "./components/Stonks";
import DatesPicker from "./components/DatesPicker";
import Slider from "./components/Slider";
import AudioPlayer from "./components/AudioPlayer";
import { readData } from "./utils/readData";
import { notes_to_freq_dict } from "./utils/notes-frequencies";
import { dataToNotes } from "./components/DataToNotes";

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2008-09-28"));
  const [endDate, setEndDate] = useState(new Date("2009-11-23"));
  const [data, setData] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const [sliderValue, setSliderValue] = useState(15);
  const [tempFreq, setTempFreq] = useState(null);

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
    const [dataRead, noteDataRead] = readData(startDate, endDate, sliderValue);
    setData(dataRead);
    setNoteData(noteDataRead);

    let tempData = noteDataRead.map((value) => (value.high + value.low) / 2);
    let test = dataToNotes(tempData, notes_to_freq_dict);
    setTempFreq(test);
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
      <Stonks data={data} notePoints={noteData} />
      <AudioPlayer 
        frequencies={tempFreq}
        noteDuration={0.5}
        audioContext={audioContext}
        />
    </div>
  );
};

export default App;
