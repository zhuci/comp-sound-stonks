export const readData = (startDate, endDate, numData) => {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const allData = [];

  for (let year = startYear; year <= endYear; year++) {
    if (year >= 2000 && year <= 2023) {
      let yearData = require(`../../data/spy/${year}.json`);
      allData.push(yearData);
    }
  }

  const flatData = allData.flat();

  let dateRangeData = flatData.filter((item) => {
    const itemDate = new Date(item.datetime_str);
    return itemDate >= startDate && itemDate <= endDate;
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
