import React, { useState, useEffect } from "react";
import Stonks from "./components/Stonks";
import DatesPicker from "./components/DatesPicker";
import Slider from "./components/Slider";
import AudioPlayer from "./components/AudioPlayer";
import { readData } from "./utils/readData";
import { notes_to_freq_dict } from "./utils/notes-frequencies";
import { dataToNotes } from "./utils/dataToNotes";

const App = () => {
  const [startDate, setStartDate] = useState(new Date("2008-09-28"));
  const [endDate, setEndDate] = useState(new Date("2009-11-23"));
  const [data, setData] = useState([]);
  const [binnedData, setBinnedData] = useState([]);
  const [sliderValue, setSliderValue] = useState(15);
  const [noteData, setNoteData] = useState(null);

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
    const [dataRead, binnedDataRead] = readData(startDate, endDate, sliderValue);
    setData(dataRead);
    setBinnedData(binnedDataRead);

    let closeBinnedData = binnedDataRead.map((value) => value.close);
    let newNoteData = dataToNotes(closeBinnedData, notes_to_freq_dict);
    console.log("newNoteData", newNoteData)
    setNoteData(newNoteData);
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
      <Stonks data={data} notePoints={binnedData} />
      <AudioPlayer 
        noteData={noteData}
        noteDuration={0.5}
        audioContext={audioContext}
        />
    </div>
  );
};

export default App;
