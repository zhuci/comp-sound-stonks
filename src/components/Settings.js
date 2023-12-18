import React from "react";
import DatesPicker from "./DatesPicker";
import NoteSlider from "./NoteSlider";
import NoteDurationSlider from "./NoteDurationSlider";
import KeyOctavesPicker from "./KeyOctavesPicker";
import VolumeToggle from "./VolumeToggle";

const Settings = ({
  startDate,
  endDate,
  noteSliderValue,
  scaleKey,
  keyType,
  startOct,
  endOct,
  noteDuration,
  volumeChange,
  setStartDate,
  setEndDate,
  setNoteSliderValue,
  setScaleKey,
  setKeyType,
  setStartOct,
  setEndOct,
  setNoteDuration,
  setVolumeChange,
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
        keyType={keyType}
        startOct={startOct}
        endOct={endOct}
        setScaleKey={setScaleKey}
        setKeyType={setKeyType}
        setStartOct={setStartOct}
        setEndOct={setEndOct}
      />
      <VolumeToggle
        volumeChange={volumeChange}
        setVolumeChange={setVolumeChange}
      />
    </div>
  );
};

export default Settings;
