const month = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguest",
  "September",
  "October",
  "November",
  "December",
];
export default (by = "2022-10-16T14:43:10+0:00") => {
  const splits = by.split("T");
  const date = splits[0];
  const time = splits[1].split("+")[0];
  const zone = splits[1].split("+")[1];

  console.log(date, time, zone);
  //   date
  const _date = date.split("-");
  const y = _date[0];
  const m = month[Number(_date[1]) - 1];
  const d = _date[1];
  console.log(y, m, d);
};
