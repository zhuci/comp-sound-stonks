import React, { useState } from "react";
import dayjs from "dayjs";
import Settings from "../components/Settings";
import Result from "../components/Result";
import NavBar from "../components/NavBar";

const useSettings = (initialSettings) => {
  const [settings, setSettings] = useState(initialSettings);

  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const setStartDate = (start) => {
    updateSetting("date", { ...settings.date, start });
  };

  const setEndDate = (end) => {
    updateSetting("date", { ...settings.date, end });
  };

  return {
    settings,
    setStartDate,
    setEndDate,
    updateSetting, // Now you can use this function to update any setting
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
    volumeChange: false,
  };

  const { settings, setStartDate, setEndDate, updateSetting } =
    useSettings(initialSettings);

  return (
    <div className="flex flex-col m-8 space-y-4">
      <NavBar />
      <div className="pt-10">
        <Settings
          startDate={settings.date.start}
          endDate={settings.date.end}
          noteSliderValue={settings.noteSliderValue}
          scaleKey={settings.scaleKey}
          startOct={settings.startOct}
          endOct={settings.endOct}
          noteDuration={settings.noteDuration}
          volumeChange={settings.volumeChange}
          additiveSynthesis={settings.additiveSynthesis}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setNoteSliderValue={(value) =>
            updateSetting("noteSliderValue", value)
          }
          setScaleKey={(value) => updateSetting("scaleKey", value)}
          setStartOct={(value) => updateSetting("startOct", value)}
          setEndOct={(value) => updateSetting("endOct", value)}
          setNoteDuration={(value) => updateSetting("noteDuration", value)}
          setVolumeChange={(value) => updateSetting("volumeChange", value)}
          setAdditiveSynthesis={(value) =>
            updateSetting("additiveSynthesis", value)
          }
        />
        <Result settings={settings} />
      </div>
    </div>
  );
};

export default Home;
