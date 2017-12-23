import moment from 'moment';

const getMergedDate = (date, time) =>
  moment(date.format('YYYY-MM-DD') + time.format(' HH:mm:ss'));

export default getMergedDate;
