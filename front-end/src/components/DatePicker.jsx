import React from 'react';
import Config from '../constants/Config';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const DatePicker = ({ changeMeetingDate, changeMeetingTime }) => {
  const interval = Config.TIME_PICKER_MINUTE_INTERVAL;
  const now = moment();
  now.add(interval - (now.minute() % interval), 'minutes');
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
        disabledMinutes={() => Config.MINUTES_TO_HIDE}
        hideDisabledOptions
        onChange={time => changeMeetingTime(time)}
      />
    </div>
  );
};
export default DatePicker;
