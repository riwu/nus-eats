import React from 'react';
import { Button } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import Config from '../constants/Config';
import getMergedDate from '../util/getMergedDate';

import DurationPicker from '../containers/DurationPickerContainer';

const dateFormat = 'D MMM YY';

const MeetingDate = ({ meeting, cancelMeeting, updateMeeting, meetingId }) => (
  <div>
    <DayPickerInput
      value={meeting.startTime.format(dateFormat)}
      format={dateFormat}
      onDayChange={newDate => updateMeeting(meetingId, {
        ...meeting,
        startTime: getMergedDate(newDate, meeting.startTime),
      })}
    />
    <TimePicker
      showSecond={false}
      use12Hours
      defaultValue={meeting.startTime}
      disabledMinutes={() => Config.MINUTES_TO_HIDE}
      hideDisabledOptions
      onDayChange={newTime => updateMeeting(meetingId, {
        ...meeting,
        startTime: getMergedDate(meeting.startTime, newTime),
      })}
    />
    <DurationPicker />
    <Button disabled={!meeting.isIdSet} onClick={() => cancelMeeting(meetingId)}>Cancel</Button>
  </div>
);

export default MeetingDate;
