import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const KeyOctavesPicker = () => {
  const [key, setKey] = useState("C");
  const [startOct, setStartOct] = useState(0);
  const [endOct, setEndOct] = useState(8);

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
  const octaveItems = Array.from({ length: 11 }, (_, index) => (
    <MenuItem key={index} value={index}>
      {index}
    </MenuItem>
  ));

  return (
    <div className="flex space-x-4">
      {/* key */}
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        <InputLabel>Key</InputLabel>
        <Select
          value={key}
          label="Age"
          onChange={(e) => setKey(e.target.value)}
        >
          {allKeys.map((curKey, index) => (
            <MenuItem key={index} value={curKey}>
              {curKey}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* starting octave */}
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
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
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
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
