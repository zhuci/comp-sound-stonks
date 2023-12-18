import React, { useState, useEffect, useMemo } from "react";
import Stonks from "./Stonks";
import AudioPlayer from "./AudioPlayer";

import { dataToNotes } from "../utils/dataToNotes";
import { readAllData } from "../utils/readData";

const Result = ({ settings }) => {
  const [data, setData] = useState({
    raw: [],
    note: null,
  });

  const [currentTime, setCurrentTime] = useState(null);

  const allStockData = useMemo(
    () => readAllData(settings.date.start, settings.date.end),
    [settings.date.start, settings.date.end]
  );

  useEffect(() => {
    const binnedData = allStockData[settings.noteSliderValue];
    const rawData = allStockData["raw_data"];
    let newNoteData = dataToNotes(
      binnedData,
      settings.scaleKey,
      settings.keyType,
      settings.startOct,
      settings.endOct
    );

    setData(() => ({ note: newNoteData, raw: rawData }));
    setCurrentTime(0);
  }, [
    settings.noteSliderValue,
    settings.scaleKey,
    settings.keyType,
    settings.startOct,
    settings.endOct,
    allStockData,
  ]);

  return (
    <div className="flex flex-col space-y-4">
      <Stonks
        data={data.raw}
        notePoints={data.note}
        currentTime={currentTime}
      />
      <AudioPlayer
        noteData={data.note}
        noteDuration={settings.noteDuration}
        onTimeUpdate={setCurrentTime}
        volumeChange={settings.volumeChange}
        additiveSynthesis={settings.additiveSynthesis}
      />
    </div>
  );
};

export default Result;
