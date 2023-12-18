import React from "react";
import DatesPicker from "./DatesPicker";
import NoteSlider from "./NoteSlider";
import NoteDurationSlider from "./NoteDurationSlider";
import KeyOctavesPicker from "./KeyOctavesPicker";
import VolumeToggle from "./VolumeToggle";
import AdditiveSynthesisToggle from "./AdditiveSynthesisToggle";
import Typography from "@mui/material/Typography";

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
  additiveSynthesis,
  setStartDate,
  setEndDate,
  setNoteSliderValue,
  setScaleKey,
  setKeyType,
  setStartOct,
  setEndOct,
  setNoteDuration,
  setVolumeChange,
  setAdditiveSynthesis,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <Typography>Choose a range of dates for your SPY data:</Typography>
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
      <Typography>
        Choose the key, type of key (major, minor, or both<sup>1</sup>) and
        range of octaves for your composition:
      </Typography>
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
      <div className="flex ">
        <VolumeToggle
          volumeChange={volumeChange}
          setVolumeChange={setVolumeChange}
        />
        <AdditiveSynthesisToggle
          additiveSynthesis={additiveSynthesis}
          setAdditiveSynthesis={setAdditiveSynthesis}
        />
      </div>
      <Typography variant="caption">
        <sup>1</sup> If both, then the notes will be from the key's major scale
        if the data is increasing and from the key's minor scale if the data is
        decreasing
        <br />
        <sup>2</sup> Sound volume based on trading volume
        <br />
        <sup>3</sup> larger high - low price difference equals more partials
      </Typography>
    </div>
  );
};

export default Settings;
