import React from "react";
import "react-datepicker/dist/react-datepicker.css";
// import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const DatesPicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex space-x-4">
        <DatePicker
          label="start date"
          value={startDate}
          onChange={(newStartDate) => setStartDate(newStartDate)}
        />
        <DatePicker
          label="end date"
          value={endDate}
          onChange={(newEndDate) => setEndDate(newEndDate)}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatesPicker;
