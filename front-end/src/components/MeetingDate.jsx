import React from 'react';
import { Button } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import Config from '../constants/Config';

const style = {
  display: 'flex',
};

const MeetingDate = ({ date, time, cancelMeeting, updateMeeting, meetingID }) => (
  <div style={style}>
    <DayPickerInput
      value={date.format('DD/MM/YYYY')}
      onDayChange={newDate => updateMeeting({ id: meetingID, newDate })}
    />
    <TimePicker
      showSecond={false}
      use12Hours
      defaultValue={time}
      disabledMinutes={() => Config.MINUTES_TO_HIDE}
      hideDisabledOptions
      onChange={newTime => updateMeeting({ id: meetingID, newTime })}
    />
    <Button onClick={() => cancelMeeting(meetingID)}>Cancel</Button>
  </div>
);

export default MeetingDate;
