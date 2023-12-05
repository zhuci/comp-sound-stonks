import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatesPicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date("2008-09-27"));
  const [endDate, setEndDate] = useState(new Date("2009-11-23"));

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(date);
    onDateChange(date, date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date("2000-01-01")}
        maxDate={new Date()}
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={new Date()}
      />
    </div>
  );
};

export default DatesPicker;
