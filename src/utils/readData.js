import dayjs from "dayjs";
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

const readData = (startDate, endDate, numData) => {
  const startYear = startDate.year();
  const endYear = endDate.year();
  const allData = [];

  for (let year = startYear; year <= endYear; year++) {
    if (year >= 2000 && year <= 2023) {
      let yearData = require(`../../data/spy/${year}.json`);
      allData.push(yearData);
    }
  }

  const flatData = allData.flat();

  let dateRangeData = flatData.filter((item) => {
    const itemDate = dayjs(item.datetime_str);
    return (
      itemDate.isSameOrAfter(startDate) && itemDate.isSameOrBefore(endDate)
    );
  });

  let totalElements = dateRangeData.length;
  if (totalElements > 500) {
    dateRangeData = dateRangeData.filter(
      (_, index) => index % Math.floor(totalElements / 500) === 0
    );
  }

  totalElements = dateRangeData.length;
  if (dateRangeData.length > numData) {
    let indices = Array.from({ length: numData }, (_, i) =>
      Math.round((i * totalElements) / numData)
    );
    let sliderData = indices.map((index) => dateRangeData[index]);

    return [dateRangeData, sliderData];
  }

  return [dateRangeData, dateRangeData];
};

export const readAllData = (startDate, endDate) => {
  let output = {};
  let date_range_data = [];
  for (let i = 1; i <= 5; i++) {
    let [cur_date_range, cur_binned] = readData(startDate, endDate, i * 20);
    output[i * 20] = cur_binned;
    date_range_data = cur_date_range;
  }
  output["raw_data"] = date_range_data;
  return output;
};
