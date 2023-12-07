// get notes in a key for given octave
// hardcode c maj rn

// scale/normalize the data
function normalizeDataToRange(data, newMin, newMax) {
  let min = Math.min(...data);
  let max = Math.max(...data);

  return data.map((value) => {
    let normalized = (value - min) / (max - min); // Normalize between 0 and 1
    return normalized * (newMax - newMin) + newMin; // Scale to new range
  });
}

// octaves from C0
function calculateNoteFrequencies(octaves) {
  const A4 = 440.0;
  let notes = {};
  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  for (let i = 0; i < octaves * 12; i++) {
    const noteFrequency = A4 * Math.pow(2, (i - 57) / 12);
    const noteName = noteNames[i % 12] + Math.floor(i / 12);
    notes[noteName] = noteFrequency;
  }

  return notes;
}

function findClosestNote(frequency, notes_dict) {
  let closestNote = "";
  let smallestDifference = Infinity;

  for (let note in notes_dict) {
    let difference = Math.abs(notes_dict[note] - frequency);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestNote = note;
    }
  }

  return closestNote;
}

// return array of note freuqncies and array of note names
export function dataToNotes(data, notes_dict) {
  //  newMin, newMax --> lets do "C2" to "B5"
  let normalized_data = normalizeDataToRange(data, 65.41, 987.77);
  return normalized_data.map((value) => { 
    let closest_note = findClosestNote(value, notes_dict);
    return {
      note: closest_note,
      freq: notes_dict[closest_note]
    }
  });
}
