import moment from 'moment';

// /**
//  * @param {date|moment} start The start date
//  * @param {date|moment} end The end date
//  * @param {string} type The range type. eg: 'days', 'hours' etc
//  */
const getCalendarWeek = (startDate, endDate) => {
  let fromDate = moment(startDate);
  let toDate = moment(endDate);
  let diff = toDate.diff(fromDate, "days");
  let range = [];

  for (let i = 0; i < diff; i++) {
    range.push(moment(startDate).add(i, "day"));
  }
  return range;
}

export default getCalendarWeek;