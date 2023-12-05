import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ frequencies, noteDuration }) => {
    // State for the audio context
    const [audioContext, setAudioContext] = useState(null);

    // Frequencies array
    // const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // C4 to B4
    // const noteDuration = 0.5; // Duration for each note

    // useEffect(() => {
    //     // Initialize the audio context when the component mounts
    //     const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    //     setAudioContext(newAudioContext);

    //     // Clean up on unmount
    //     return () => {
    //         if (newAudioContext) {
    //             newAudioContext.close();
    //         }
    //     };
    // }, []);
    const initializeAudioContext = () => {
        // Create AudioContext on user interaction
        if (!audioContext) {
            const newAudioContext = new (window.AudioContext || window.webkitAudioContext);
            setAudioContext(newAudioContext);
        } else {
            // If AudioContext is suspended, resume it
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        }
    };

    const playFrequency = (freq, duration) => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        console.log("frew", freq)
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    };

    const playFrequencies = () => {
        initializeAudioContext();
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
