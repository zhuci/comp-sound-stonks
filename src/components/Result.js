import React, { useState, useEffect, useMemo } from "react";
import Stonks from "./Stonks";
import AudioPlayer from "./AudioPlayer";

import { dataToNotes } from "../utils/dataToNotes";
import { readAllData } from "../utils/readData";

const Result = ({ settings }) => {
  const [data, setData] = useState({
    raw: [],
    binned: [],
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

    let closeBinnedData = binnedData.map((value) => value.close);

    let newNoteData = dataToNotes(
      closeBinnedData,
      settings.scaleKey,
      settings.startOct,
      settings.endOct
    );
    setData(() => ({ note: newNoteData, raw: rawData, binned: binnedData }));
    setCurrentTime(0);
  }, [
    settings.noteSliderValue,
    settings.scaleKey,
    settings.startOct,
    settings.endOct,
    allStockData,
  ]);

  return (
    <div className="flex flex-col space-y-4">
      <Stonks
        data={data.raw}
        notePoints={data.binned}
        currentTime={currentTime}
      />
      <AudioPlayer
        noteData={data.note}
        noteDuration={settings.noteDuration}
        onTimeUpdate={setCurrentTime}
      />
    </div>
  );
};

export default Result;
