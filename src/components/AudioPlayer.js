import React from "react";


// const globalGainMax = 0.6;
const attackMaxGain = 0.5;
const attackConstant = 0.002;
const attackTime = 0.01;
const decayConstant = 0.002;
const decayTime = 0.01;
const sustainGain = 0.3;
const releaseConstant = 0.01;
// const epsilon = 0.001;

const AudioPlayer = ({ frequencies, noteDuration, audioContext }) => {

  const playFrequency = (freq, duration) => {
    if (audioContext) {
        const oscillator = audioContext.createOscillator();
        oscillator.type = "sine";
        // set target at time
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        // oscillator.frequency.setTargetAtTime(freq, audioContext.currentTime, 0.1)

        // ADSR
        const gainNode = audioContext.createGain();
        // ADSR Attack
        gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
        gainNode.gain.setTargetAtTime(attackMaxGain, audioContext.currentTime, attackConstant);
        // ADSR Decay 
        gainNode.gain.setTargetAtTime(sustainGain, audioContext.currentTime + attackTime, decayConstant);

        oscillator.connect(gainNode).connect(audioContext.destination);
        oscillator.start();

        // ADSR Sustain + Release
        gainNode.gain.setTargetAtTime(0, audioContext.currentTime + attackTime + decayTime + noteDuration, releaseConstant);
    } else {
        console.error('AudioContext not initialized');
    }
  };

  const playFrequencies = () => {
    // initializeAudioContext();
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playFrequency(freq, noteDuration);
      }, noteDuration * 1000 * index);
    });
  };

  return (
    <div>
      <button onClick={playFrequencies}>Play Notes</button>
    </div>
  );
};

export default AudioPlayer;
