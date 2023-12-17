import React from "react";
import DatesPicker from "./DatesPicker";
import NoteSlider from "./NoteSlider";
import NoteDurationSlider from "./NoteDurationSlider";

import KeyOctavesPicker from "./KeyOctavesPicker";

const Settings = ({
  startDate,
  endDate,
  noteSliderValue,
  scaleKey,
  startOct,
  endOct,
  noteDuration,
  setStartDate,
  setEndDate,
  setNoteSliderValue,
  setScaleKey,
  setStartOct,
  setEndOct,
  setNoteDuration,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <DatesPicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <NoteSlider
        sliderValue={noteSliderValue}
        setSliderValue={setNoteSliderValue}
      />
      <NoteDurationSlider
        sliderValue={noteDuration}
        setSliderValue={setNoteDuration}
      />
      <KeyOctavesPicker
        scaleKey={scaleKey}
        startOct={startOct}
        endOct={endOct}
        setScaleKey={setScaleKey}
        setStartOct={setStartOct}
        setEndOct={setEndOct}
      />
    </div>
  );
};

export default Settings;
