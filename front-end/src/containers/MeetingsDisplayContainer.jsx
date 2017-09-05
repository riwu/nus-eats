import React from 'react';
import { connect } from 'react-redux';
import MeetingDisplay from '../components/MeetingDisplay';
import { cancelMeeting, updateMeeting } from '../actions';

const MeetingsDisplayContainer = ({ meetings, cancelMeeting, updateMeeting }) => {
  if (meetings.length === 0) return null;
  return (
    <div>
      <div>Existing meetings</div>
      {meetings.map(([id, meeting]) => (
        <MeetingDisplay
          key={id}
          meeting={meeting}
          meetingId={id}
          cancelMeeting={cancelMeeting}
          updateMeeting={updateMeeting}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  meetings: Object.entries(state.meeting.meetings)
    .filter(([id, meeting]) => meeting.isActive &&
                               meeting.canteenId === state.meeting.canteenId),
});

const mapDispatchToProps = dispatch => ({
  cancelMeeting: id => dispatch(cancelMeeting(id)),
  updateMeeting: (id, meeting) => dispatch(updateMeeting(id, meeting)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MeetingsDisplayContainer);
