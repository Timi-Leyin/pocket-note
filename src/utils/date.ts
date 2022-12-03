const month = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default (str: string) => {
  const date = new Date(str);
  const mm = month[date.getMonth()];
  const dd = date.getUTCDate();
  const yy = date.getFullYear();

  return `${mm} ${dd}, ${yy}`;
};
