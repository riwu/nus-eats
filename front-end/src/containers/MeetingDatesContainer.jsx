import React from 'react';
import { connect } from 'react-redux';
import MeetingDate from '../components/MeetingDate';

const MeetingDatesContainer = ({ meetings }) => {
  if (meetings.length === 0) return null;
  return (
    <div>
      <div>Existing meetings</div>
      {meetings.map(meeting => (
        <MeetingDate key={meeting.id} date={meeting.date} time={meeting.time} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  meetings: state.meeting.meetings
      .filter(meeting => meeting.canteenID === state.meeting.canteenID),
});

export default connect(
    mapStateToProps,
)(MeetingDatesContainer);
