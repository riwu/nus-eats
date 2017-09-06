import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TimeSelector from './TimeSelector';
import DurationPicker from './DurationPicker';

import './MeetingCreator.css';

const MeetingCreator = ({ meetings }) => (
  <div className="MeetingCreator">
    <div className="picker">
      <div className="text">Select Date</div>
      <DayPicker
        onDayClick={date => meetings[0].onDateUpdate(moment(date))}
        selectedDays={meetings[0].date ? meetings[0].date.toDate() : null}
      />
    </div>
    <div className="picker">
      <div className="text">Select Time</div>
      <TimeSelector
        timings={meetings.map(meeting => ({
          value: meeting.time,
          onUpdate: time => meeting.onTimeUpdate(time),
        }))}
      />
    </div>
    <div className="picker">
      <div className="text">Select Duration</div>
      <DurationPicker
        durations={meetings.map(meeting => ({
          value: meeting.duration,
          onUpdate: duration => meeting.onDurationUpdate(duration),
        }))}
      />
    </div>
  </div>
);

export default MeetingCreator;
