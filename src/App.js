import React, { useState } from "react";
import dayjs from "dayjs";
import Settings from "./components/Settings";
import Result from "./components/Result";

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

  return { settings, setStartDate, setEndDate, setSliderValue };
};

const App = () => {
  const initialSettings = {
    date: {
      start: dayjs("2008-09-28"),
      end: dayjs("2009-11-23"),
    },
    sliderValue: 15,
  };

  const { settings, setStartDate, setEndDate, setSliderValue } =
    useSettings(initialSettings);

  // create audioCtx and global gain
  const [audioContext, setAudioContext] = useState(null);

  if (!audioContext) {
    const newAudioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    setAudioContext(newAudioContext);
  } else {
    // If AudioContext is suspended, resume it
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  }

  return (
    <div className="flex flex-col m-8 space-y-4">
      <Settings
        startDate={settings.date.start}
        endDate={settings.date.end}
        sliderValue={settings.sliderValue}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setSliderValue={setSliderValue}
      />
      <Result settings={settings} audioContext={audioContext} />
    </div>
  );
};

export default App;
