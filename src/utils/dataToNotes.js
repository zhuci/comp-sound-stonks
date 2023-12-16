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
export function dataToNotes(data, notesDict) {
  //  newMin, newMax --> lets do "C2" to "B5"
  let normalized_data = normalizeDataToRange(data, 65.41, 987.77);
  return normalized_data.map((value) => {
    let closest_note = findClosestNote(value, notesDict);
    return {
      note: closest_note,
      freq: notesDict[closest_note],
    };
  });
}

// based on key and range, return dict of major and minor notes and freq
export function keyRangeToFreq(key, startOct, endOct, notesDict, scalesDict) {
  let major_dict = {};
  let minor_dict = {};
  let maj_scale = scalesDict[key + "_maj"];
  let min_scale = scalesDict[key + "_min"];

  for (let cur_oct = startOct; cur_oct < endOct + 1; cur_oct++) {
    for (let cur_note = 0; cur_note < endOct + 7; cur_note++) {
      let cur_maj_note = maj_scale[cur_note] + cur_oct;
      let cur_min_note = min_scale[cur_note] + cur_oct;
      major_dict[cur_maj_note] = notesDict[cur_maj_note];
      minor_dict[cur_min_note] = notesDict[cur_min_note];
    }
  }

  return major_dict, minor_dict;
}
