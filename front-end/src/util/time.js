import moment from 'moment';

export const FORMAT_STRING = 'YYYY-MM-DD HH:mm:ssZ';

export const format = (time) => {
  return time.format(FORMAT_STRING).slice(0, -3);
};

export const parse = (string) => {
  return moment(string, FORMAT_STRING);
};
