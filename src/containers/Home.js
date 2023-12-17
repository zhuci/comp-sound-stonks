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

  const setSliderValue = (sliderValue) => {
    setSettings((prevSettings) => ({ ...prevSettings, sliderValue }));
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

  return {
    settings,
    setStartDate,
    setEndDate,
    setSliderValue,
    setScaleKey,
    setStartOct,
    setEndOct,
  };
};

const Home = () => {
  const initialSettings = {
    date: {
      start: dayjs("2008-09-28"),
      end: dayjs("2009-11-23"),
    },
    sliderValue: 15,
    scaleKey: "C",
    startOct: 0,
    endOct: 8,
  };

  const {
    settings,
    setStartDate,
    setEndDate,
    setSliderValue,
    setScaleKey,
    setStartOct,
    setEndOct,
  } = useSettings(initialSettings);

  return (
    <div className="flex flex-col m-8 space-y-4">
      <Settings
        startDate={settings.date.start}
        endDate={settings.date.end}
        sliderValue={settings.sliderValue}
        scaleKey={settings.scaleKey}
        startOct={settings.startOct}
        endOct={settings.endOct}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setSliderValue={setSliderValue}
        setScaleKey={setScaleKey}
        setStartOct={setStartOct}
        setEndOct={setEndOct}
      />
      <Result settings={settings} />
    </div>
  );
};

export default Home;
