import React from 'react';
import moment from 'moment';
import Picker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DayPicker = ({ recentMeetings, meetings }) => {
  const format = 'D M Y';
  const meetingTimes = new Set(meetings.map(meeting => meeting.startTime.format(format)));
  return (
    <Picker
      enableOutsideDays
      onDayClick={date => recentMeetings[0].onDateUpdate(moment(date))}
      selectedDays={recentMeetings[0].date ? recentMeetings[0].date.toDate() : null}
      modifiers={{
        hasMeeting: day => meetingTimes.has(moment(day).format(format)),
      }}
      modifiersStyles={{
        hasMeeting: {
          color: '#ed0000',
        },
      }}
    />
  );
};

export default DayPicker;
