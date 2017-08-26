import React from 'react';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const DatePicker = ({ changeMeetingDate, changeMeetingTime }) => {
  const now = moment();
  changeMeetingDate(now);
  changeMeetingTime(now);
  return (
    <div>
      <DayPicker onDayClick={date => changeMeetingDate(moment(date))} />
      <TimePicker
        showSecond={false}
        use12Hours
        open
        defaultValue={now}
        onChange={time => changeMeetingTime(time)}
      />
    </div>
  );
};
export default DatePicker;
