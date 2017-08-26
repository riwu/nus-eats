import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const style = {
  display: 'flex',
};

const MeetingDate = ({ date, time }) => (
  <div style={style}>
    <DayPickerInput value={date.format('DD/MM/YYYY')} />
    <TimePicker
      showSecond={false}
      use12Hours
      value={time}
    />
  </div>
);

export default MeetingDate;
