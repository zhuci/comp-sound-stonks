import React from "react";
import DatesPicker from "./DatesPicker";
import NoteSlider from "./NoteSlider";
import NoteDurationSlider from "./NoteDurationSlider";
import KeyOctavesPicker from "./KeyOctavesPicker";
import VolumeToggle from "./VolumeToggle";
import AdditiveSynthesisToggle from "./AdditiveSynthesisToggle";

const Settings = ({
  startDate,
  endDate,
  noteSliderValue,
  scaleKey,
  startOct,
  endOct,
  noteDuration,
  volumeChange,
  additiveSynthesis,
  setStartDate,
  setEndDate,
  setNoteSliderValue,
  setScaleKey,
  setStartOct,
  setEndOct,
  setNoteDuration,
  setVolumeChange,
  setAdditiveSynthesis,
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
      <VolumeToggle
        volumeChange={volumeChange}
        setVolumeChange={setVolumeChange}
      />
      <AdditiveSynthesisToggle
        additiveSynthesis={additiveSynthesis}
        setAdditiveSynthesis={setAdditiveSynthesis}
      />
    </div>
  );
};

export default Settings;
