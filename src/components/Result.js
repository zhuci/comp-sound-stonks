import React, { useState, useEffect } from "react";
import Stonks from "./Stonks";
import AudioPlayer from "./AudioPlayer";

import { dataToNotes } from "../utils/dataToNotes";
import { readData } from "../utils/readData";

const Result = ({ settings }) => {
  const [data, setData] = useState({
    raw: [],
    binned: [],
    note: null,
  });

  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const [rawData, binnedData] = readData(
      settings.date.start,
      settings.date.end,
      settings.sliderValue
    );

    let closeBinnedData = binnedData.map((value) => value.close);

    let newNoteData = dataToNotes(
      closeBinnedData,
      settings.scaleKey,
      settings.startOct,
      settings.endOct
    );
    setData(() => ({ note: newNoteData, raw: rawData, binned: binnedData }));
    setCurrentTime(0);
  }, [settings]);

  return (
    <div className="flex flex-col space-y-4">
      <Stonks
        data={data.raw}
        notePoints={data.binned}
        currentTime={currentTime}
      />
      <AudioPlayer
        noteData={data.note}
        noteDuration={0.5}
        onTimeUpdate={setCurrentTime}
      />
    </div>
  );
};

export default Result;
