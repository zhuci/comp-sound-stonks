import React, { useState } from "react";
import dayjs from "dayjs";
import Settings from "../components/Settings";
import Result from "../components/Result";

const useSettings = (initialSettings) => {
  const [settings, setSettings] = useState(initialSettings);

  const setStartDate = (start) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      date: { ...prevSettings.date, start },
    }));
  };

  const setEndDate = (end) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      date: { ...prevSettings.date, end },
    }));
  };

  const setNoteSliderValue = (noteSliderValue) => {
    setSettings((prevSettings) => ({ ...prevSettings, noteSliderValue }));
  };

  const setScaleKey = (scaleKey) => {
    setSettings((prevSettings) => ({ ...prevSettings, scaleKey }));
  };

  const setStartOct = (startOct) => {
    setSettings((prevSettings) => ({ ...prevSettings, startOct }));
  };

  const setEndOct = (endOct) => {
    setSettings((prevSettings) => ({ ...prevSettings, endOct }));
  };

  const setNoteDuration = (noteDuration) => {
    setSettings((prevSettings) => ({ ...prevSettings, noteDuration }));
  };

  return {
    settings,
    setStartDate,
    setEndDate,
    setNoteSliderValue,
    setScaleKey,
    setStartOct,
    setEndOct,
    setNoteDuration,
  };
};

const Home = () => {
  const initialSettings = {
    date: {
      start: dayjs("2008-09-28"),
      end: dayjs("2009-11-23"),
    },
    noteSliderValue: 20,
    scaleKey: "C",
    startOct: 4,
    endOct: 6,
    noteDuration: 0.5,
  };

  const {
    settings,
    setStartDate,
    setEndDate,
    setNoteSliderValue,
    setScaleKey,
    setStartOct,
    setEndOct,
    setNoteDuration,
  } = useSettings(initialSettings);

  return (
    <div className="flex flex-col m-8 space-y-4">
      <Settings
        startDate={settings.date.start}
        endDate={settings.date.end}
        noteSliderValue={settings.noteSliderValue}
        scaleKey={settings.scaleKey}
        startOct={settings.startOct}
        endOct={settings.endOct}
        noteDuration={settings.noteDuration}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setNoteSliderValue={setNoteSliderValue}
        setScaleKey={setScaleKey}
        setStartOct={setStartOct}
        setEndOct={setEndOct}
        setNoteDuration={setNoteDuration}
      />
      <Result settings={settings} />
    </div>
  );
};

export default Home;
