import React from "react";
import DatesPicker from "./DatesPicker";
import NoteSlider from "./NoteSlider";
import KeyOctavesPicker from "./KeyOctavesPicker";

const Settings = ({
  startDate,
  endDate,
  sliderValue,
  scaleKey,
  startOct,
  endOct,
  setStartDate,
  setEndDate,
  setSliderValue,
  setScaleKey,
  setStartOct,
  setEndOct,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <DatesPicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <NoteSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
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
