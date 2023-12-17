import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NoteSlider = ({ sliderValue, setSliderValue }) => {
  return (
    <Box display="flex" alignItems="center" marginBottom={2}>
      <Typography id="number-of-notes" gutterBottom>
        Number of notes
      </Typography>
      <Box width={300} marginLeft={2}>
        <Slider
          value={sliderValue}
          onChange={(_, newValue) => setSliderValue(newValue)}
          min={10}
          max={100}
          defaultValue={20}
          step={10}
          marks
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
};

export default NoteSlider;
