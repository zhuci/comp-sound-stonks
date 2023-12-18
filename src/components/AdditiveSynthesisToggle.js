import React from "react";
import Switch from "@mui/material/Switch";

const AdditiveSynthesisToggle = ({
  additiveSynthesis,
  setAdditiveSynthesis,
}) => {
  const toggleAdditiveSynthesis = (event) => {
    setAdditiveSynthesis(event.target.checked);
  };

  return (
    <div>
      <label>
        Additive Synthesis
        <Switch
          checked={additiveSynthesis}
          onChange={toggleAdditiveSynthesis}
          name="additiveSynthesis"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </label>
    </div>
  );
};

export default AdditiveSynthesisToggle;
