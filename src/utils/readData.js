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

  const totalElements = dateRangeData.length;
  console.log("data length: ", totalElements);
  if (totalElements > 500) {
    dateRangeData = dateRangeData.filter(
      (_, index) => index % Math.floor(totalElements / 500) === 0
    );
  }
  console.log("data length after filter: ", dateRangeData.length);

  if (dateRangeData.length > numData) {
    // let sliderData = dateRangeData.filter(
    //   (_, index) => index % Math.ceil(dateRangeData.length / numData) === 0
    // );

    let indices = Array.from({ length: numData }, (_, i) =>
      Math.round((i * totalElements) / numData)
    );
    let sliderData = indices.map((index) => dateRangeData[index]);
    console.log("numData", numData);
    console.log("date range data length: ", sliderData.length);

    return [dateRangeData, sliderData];
  }

  return [dateRangeData, dateRangeData];
};
