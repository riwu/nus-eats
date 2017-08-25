import React from 'react';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const DatePicker = () => (
  <div>
    <DayPicker />
    <TimePicker showSecond={false} use12Hours defaultValue={moment()} />
  </div>
);

export default DatePicker;
