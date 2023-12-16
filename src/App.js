import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Stonks from "./components/Stonks";
import AudioPlayer from "./components/AudioPlayer";
import DatesPicker from "./components/DatesPicker";
import NoteSlider from "./components/NoteSlider";
import { readData } from "./utils/readData";

import { notes_to_freq_dict, scale_to_notes } from "./utils/notes-frequencies";
import { dataToNotes, keyRangeToFreq } from "./utils/dataToNotes";

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

  // TODO ellen: remove the weird box/stack stuff and use tailwind
  return (
    <div className="flex flex-col space-y-4 m-8">
      <DatesPicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <NoteSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
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
