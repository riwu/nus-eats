import React from 'react';
import { connect } from 'react-redux';
import MeetingDate from '../components/MeetingDate';
import { cancelMeeting, updateMeeting } from '../actions';

const MeetingDatesContainer = ({ meetings, cancelMeeting, updateMeeting }) => {
  if (meetings.length === 0) return null;
  return (
    <div>
      <div>Existing meetings</div>
      {meetings.map(meeting => (
        <MeetingDate
          key={meeting.id}
          date={meeting.date}
          time={meeting.time}
          meetingId={meeting.id}
          cancelMeeting={cancelMeeting}
          updateMeeting={updateMeeting}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  meetings: state.meeting.meetings.filter(meeting => meeting.isActive &&
    meeting.canteenId === state.meeting.canteenId),
});

export default connect(
    mapStateToProps,
    { cancelMeeting, updateMeeting },
)(MeetingDatesContainer);
