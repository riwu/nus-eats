import React from 'react';
import { Button } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import Config from '../constants/Config';

const MeetingDate = ({ startTime, endTime, cancelMeeting, updateMeeting, meetingId }) => (
  <div>
    <DayPickerInput
      value={startTime.format('DD/MM/YYYY')}
      onDayChange={newDate => updateMeeting({ id: meetingId, newDate })}
    />
    <TimePicker
      showSecond={false}
      use12Hours
      defaultValue={startTime}
      disabledMinutes={() => Config.MINUTES_TO_HIDE}
      hideDisabledOptions
      onChange={newTime => updateMeeting({ id: meetingId, newTime })}
    />
    <Button onClick={() => cancelMeeting(meetingId)}>Cancel</Button>
  </div>
);

export default MeetingDate;
