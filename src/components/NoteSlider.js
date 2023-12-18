import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NoteSlider = ({ sliderValue, setSliderValue }) => {
  return (
    <Box marginBottom={1}>
      <Typography id="number-of-notes" gutterBottom>
        Number of Notes:
      </Typography>
      <Box marginLeft={2}>
        <Slider
          value={sliderValue}
          onChange={(_, newValue) => setSliderValue(newValue)}
          min={20}
          max={100}
          defaultValue={20}
          step={20}
          marks
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
};

export default NoteSlider;
