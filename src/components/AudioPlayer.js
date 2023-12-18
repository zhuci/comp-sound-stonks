import React, { useState, useEffect, useCallback, useMemo } from "react";
import Button from "@mui/material/Button";

const globalGainValue = 0.8;
const attackMaxGain = 0.5;
const attackConstant = 0.002;
const attackTime = 0.01;
const decayConstant = 0.002;
const decayTime = 0.01;
const sustainGain = 0.3;
const releaseConstant = 0.01;
// const epsilon = 0.001;

const AudioPlayer = ({ noteData, noteDuration, onTimeUpdate }) => {
  // create global gain
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState(0);

  const audioContext = useMemo(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
  }, []);

  const globalGain = useMemo(() => {
    const glbGain = audioContext.createGain();
    glbGain.gain.setValueAtTime(globalGainValue, audioContext.currentTime);
    glbGain.connect(audioContext.destination);
    return glbGain;
  }, [audioContext]);

  // const noteDataToVolume = useCallback(
  //   (note) => {
  //     // given the range of "volume" in noteData, scale the "volume" of this note to [0.1, 0.9]
  //     const minVolume = Math.min(...noteData.map((note) => note.volume));
  //     const maxVolume = Math.max(...noteData.map((note) => note.volume));
  //     const volume = (note.volume - minVolume) / (maxVolume - minVolume);
  //     console.log(note, volume * 0.8 + 0.1);
  //     return volume * 0.8 + 0.1;
  //   },
  //   [noteData]
  // );

  const playNote = useCallback(
    (index, freq, volume) => {
      onTimeUpdate(index);
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      // set target at time
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      // oscillator.frequency.setTargetAtTime(freq, audioContext.currentTime, 0.1)

      // ADSR
      const gainNode = audioContext.createGain();
      // ADSR Attack
      gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
      gainNode.gain.setTargetAtTime(
        attackMaxGain * volume,
        audioContext.currentTime,
        attackConstant
      );
      // ADSR Decay
      gainNode.gain.setTargetAtTime(
        sustainGain * volume,
        audioContext.currentTime + attackTime,
        decayConstant
      );

      oscillator.connect(gainNode).connect(globalGain);
      oscillator.start();

      // ADSR Sustain + Release
      gainNode.gain.setTargetAtTime(
        0,
        audioContext.currentTime + attackTime + decayTime + noteDuration,
        releaseConstant
      );
    },
    [audioContext, noteDuration, onTimeUpdate, globalGain]
  );

  const playNotes = useCallback(() => {
    if (currentNote < noteData.length) {
      const note = noteData[currentNote];
      playNote(currentNote, note.freq, note.volume);

      setTimeout(() => {
        setCurrentNote(currentNote + 1);
      }, noteDuration * 1000);
    } else {
      setIsPlaying(false);
      setCurrentNote(0);
    }
  }, [currentNote, noteData, noteDuration, playNote]);

  useEffect(() => {
    if (isPlaying) {
      playNotes();
    }
  }, [isPlaying, playNotes]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <Button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</Button>
    </div>
  );
};

export default AudioPlayer;
