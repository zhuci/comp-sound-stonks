import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

// const globalGainMax = 0.6;
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

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  useEffect(() => {
    if (isPlaying) {
      playFrequencies();
    }
  }, [isPlaying, currentNote]);

  const playFrequency = (index, freq, duration) => {
    if (audioContext) {
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
        attackMaxGain,
        audioContext.currentTime,
        attackConstant
      );
      // ADSR Decay
      gainNode.gain.setTargetAtTime(
        sustainGain,
        audioContext.currentTime + attackTime,
        decayConstant
      );

      oscillator.connect(gainNode).connect(audioContext.destination);
      oscillator.start();

      // ADSR Sustain + Release
      gainNode.gain.setTargetAtTime(
        0,
        audioContext.currentTime + attackTime + decayTime + noteDuration,
        releaseConstant
      );
    } else {
      console.error("AudioContext not initialized");
    }
  };

  const playFrequencies = () => {
    if (currentNote < noteData.length) {
      console.log(noteData.length);
      const note = noteData[currentNote];
      playFrequency(currentNote, note.freq, noteDuration);

      setTimeout(() => {
        setCurrentNote(currentNote + 1);
      }, noteDuration * 1000);
    } else {
      setIsPlaying(false);
      setCurrentNote(0);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <Button onClick={togglePlayPause}>
        {isPlaying ? "Pause" : "Play Notes"}
      </Button>
    </div>
  );
};

export default AudioPlayer;
