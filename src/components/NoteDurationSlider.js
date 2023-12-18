import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NoteDurationSlider = ({ sliderValue, setSliderValue }) => {
  return (
    <Box display="flex" alignItems="center" marginBottom={2}>
      <Typography id="number-of-notes" gutterBottom>
        Note Duration
      </Typography>
      <Box width={300} marginLeft={2}>
        <Slider
          value={sliderValue}
          onChange={(_, newValue) => setSliderValue(newValue)}
          min={0.1}
          max={1}
          defaultValue={0.5}
          step={0.1}
          marks
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
};

export default NoteDurationSlider;
