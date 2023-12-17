import { notes_to_freq_dict, scale_to_notes } from "../utils/notes-frequencies";

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
// function calculateNoteFrequencies(octaves) {
//   const A4 = 440.0;
//   let notes = {};
//   const noteNames = [
//     "C",
//     "C#",
//     "D",
//     "D#",
//     "E",
//     "F",
//     "F#",
//     "G",
//     "G#",
//     "A",
//     "A#",
//     "B",
//   ];

//   for (let i = 0; i < octaves * 12; i++) {
//     const noteFrequency = A4 * Math.pow(2, (i - 57) / 12);
//     const noteName = noteNames[i % 12] + Math.floor(i / 12);
//     notes[noteName] = noteFrequency;
//   }

//   return notes;
// }

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

// based on key and range, return dict of major and minor notes and freq
function keyRangeToFreq(scaleKey, startOct, endOct, notesDict, scalesDict) {
  let major_dict = {};
  let minor_dict = {};
  let maj_scale = scalesDict[scaleKey + "_maj"];
  let min_scale = scalesDict[scaleKey + "_min"];

  for (let cur_oct = startOct; cur_oct < endOct + 1; cur_oct++) {
    for (let cur_note = 0; cur_note < 7; cur_note++) {
      let cur_maj_note = maj_scale[cur_note] + cur_oct;
      let cur_min_note = min_scale[cur_note] + cur_oct;
      major_dict[cur_maj_note] = notesDict[cur_maj_note];
      minor_dict[cur_min_note] = notesDict[cur_min_note];
    }
  }
  return {
    major: major_dict,
    minor: minor_dict,
    majorMin: notesDict[maj_scale[0] + startOct],
    majorMax: notesDict[maj_scale[6] + endOct],
    minorMin: notesDict[min_scale[0] + startOct],
    minorMax: notesDict[min_scale[6] + endOct],
  };
}

// return array of note freuqncies and array of note names
export function dataToNotes(data, scaleKey, startOct, endOct) {
  const scales = keyRangeToFreq(
    scaleKey,
    startOct,
    endOct,
    notes_to_freq_dict,
    scale_to_notes
  );

  let normalized_major_data = normalizeDataToRange(
    data,
    scales.majorMin,
    scales.majorMax
  );
  let normalized_minor_data = normalizeDataToRange(
    data,
    scales.minorMin,
    scales.minorMax
  );
  let output = [];

  for (let i = 0; i < data.length; i++) {
    // return major if last note or next note is greater (going up)
    let closest_note = "";
    let closest_freq = 0;
    if (i === data.length - 1 || data[i] >= data[i + 1]) {
      closest_note = findClosestNote(normalized_major_data[i], scales.major);
      closest_freq = scales.major[closest_note];
    } else {
      closest_note = findClosestNote(normalized_minor_data[i], scales.minor);
      closest_freq = scales.minor[closest_note];
    }
    output.push({
      note: closest_note,
      freq: closest_freq,
    });
  }

  return output;
}
