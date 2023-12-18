import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const KeyOctavesPicker = ({
  scaleKey,
  keyType,
  startOct,
  endOct,
  setScaleKey,
  setKeyType,
  setStartOct,
  setEndOct,
}) => {
  const allKeys = [
    "A",
    "Bb",
    "B",
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "F#",
    "G",
    "Ab",
  ];
  const octaveItems = Array.from({ length: 9 }, (_, index) => (
    <MenuItem key={index} value={index}>
      {index}
    </MenuItem>
  ));

  return (
    <div className="">
      {/* key */}
      <FormControl sx={{ mr: 2, my: 1, minWidth: 200 }} size="small">
        <InputLabel>Key</InputLabel>
        <Select
          value={scaleKey}
          label="Key"
          onChange={(e) => setScaleKey(e.target.value)}
        >
          {allKeys.map((curKey, index) => (
            <MenuItem key={index} value={curKey}>
              {curKey}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* key/scale type: all major, all minor or both */}
      <FormControl sx={{ mr: 2, my: 1, minWidth: 200 }} size="small">
        <InputLabel>Type of Key</InputLabel>
        <Select
          value={keyType}
          label="Type of Key"
          onChange={(e) => setKeyType(e.target.value)}
        >
          <MenuItem key={0} value={"major"}>
            Major
          </MenuItem>
          <MenuItem key={1} value={"minor"}>
            Minor
          </MenuItem>
          <MenuItem key={2} value={"both"}>
            Both
          </MenuItem>
        </Select>
      </FormControl>
      {/* starting octave */}
      <FormControl sx={{ mr: 2, my: 1, minWidth: 200 }} size="small">
        <InputLabel>Start Octave</InputLabel>
        <Select
          value={startOct}
          label="Start Octave"
          onChange={(e) => setStartOct(e.target.value)}
        >
          {octaveItems}
        </Select>
      </FormControl>
      {/* ending octave */}
      <FormControl sx={{ mr: 2, my: 1, minWidth: 200 }} size="small">
        <InputLabel>End Octave</InputLabel>
        <Select
          value={endOct}
          label="End Octave"
          onChange={(e) => setEndOct(e.target.value)}
        >
          {octaveItems}
        </Select>
      </FormControl>
    </div>
  );
};

export default KeyOctavesPicker;
