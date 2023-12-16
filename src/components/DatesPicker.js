import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const DatesPicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  // todo: ellen: error if the start date is after the end date
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex space-x-4">
        <DatePicker
          label="start date"
          value={startDate}
          onChange={(newStartDate) => setStartDate(newStartDate)}
          minDate={dayjs("2000-01-01")}
          maxDate={dayjs("2023-11-30")}
        />
        <DatePicker
          label="end date"
          value={endDate}
          onChange={(newEndDate) => setEndDate(newEndDate)}
          minDate={dayjs("2000-01-01")}
          maxDate={dayjs("2023-11-30")}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatesPicker;
