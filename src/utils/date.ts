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

export default (str:string)=>{
  const date =  new Date(str)
 const mm = month[date.getMonth()+1]
 const dd = date.getUTCDate()
 const yy = date.getFullYear()

 return `${mm} ${dd}, ${yy}`
}