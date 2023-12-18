import React from "react";
import Switch from "@mui/material/Switch";

const VolumeToggle = ({ volumeChange, setVolumeChange }) => {
  const toggleVolumeChange = (event) => {
    setVolumeChange(event.target.checked);
  };

  return (
    <div>
      <label>
        Volume Change<sup>2</sup>
        <Switch
          checked={volumeChange}
          onChange={toggleVolumeChange}
          name="volumeChange"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </label>
    </div>
  );
};

export default VolumeToggle;
