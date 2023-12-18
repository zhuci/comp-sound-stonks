import { notes_to_freq_dict, scale_to_notes } from "../utils/notes-frequencies";

// scale/normalize the data
function normalizeDataToRange(data, field, newMin, newMax) {
  let min = Math.min(...data.map((item) => item[field]));
  let max = Math.max(...data.map((item) => item[field]));

  return data.map((item) => {
    let normalized = (item[field] - min) / (max - min); // Normalize between 0 and 1
    return normalized * (newMax - newMin) + newMin; // Scale to new range
  });
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
export function dataToNotes(data, scaleKey, keyType, startOct, endOct) {
  const scales = keyRangeToFreq(
    scaleKey,
    startOct,
    endOct,
    notes_to_freq_dict,
    scale_to_notes
  );

  let normalized_major_data = normalizeDataToRange(
    data,
    "close",
    scales.majorMin,
    scales.majorMax
  );
  let normalized_minor_data = normalizeDataToRange(
    data,
    "close",
    scales.minorMin,
    scales.minorMax
  );
  let normalized_volume_data = normalizeDataToRange(data, "volume", 0.1, 0.8);
  let output = [];

  for (let i = 0; i < data.length; i++) {
    let closest_major_note = findClosestNote(
      normalized_major_data[i],
      scales.major
    );
    let closest_minor_note = findClosestNote(
      normalized_minor_data[i],
      scales.minor
    );
    let closest_major_freq = scales.major[closest_major_note];
    let closest_minor_freq = scales.minor[closest_minor_note];

    let closest_note = "";
    let closest_freq = 0;

    if (keyType === "major") {
      closest_note = closest_major_note;
      closest_freq = closest_major_freq;
    } else if (keyType === "minor") {
      closest_note = closest_minor_note;
      closest_freq = closest_minor_freq;
    } else {
      // return major if cur note >= prev note (going up)
      if (i === 0 || data[i].close >= data[i - 1].close) {
        closest_note = closest_major_note;
        closest_freq = closest_major_freq;
      } else {
        closest_note = closest_minor_note;
        closest_freq = closest_minor_freq;
      }
    }

    output.push({
      close: data[i].close,
      datetime_str: data[i].datetime_str,
      note: closest_note,
      freq: closest_freq,
      volume: normalized_volume_data[i],
    });
  }

  return output;
}
