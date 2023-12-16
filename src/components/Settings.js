import React from "react";
import DatesPicker from "./DatesPicker";
import NoteSlider from "./NoteSlider";

const Settings = ({
  startDate,
  endDate,
  sliderValue,
  setStartDate,
  setEndDate,
  setSliderValue,
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
    </div>
  );
};

export default Settings;
