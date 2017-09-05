import { connect } from 'react-redux';
import { updateNewMeetingDate, updateNewMeetingTime } from '../../../actions';
import MeetingCreator from './MeetingCreator';

const mapStateToProps = state => ({
  newMeetingDate: state.meeting.newMeeting.date,
  newMeetingDuration: state.meeting.newMeeting.duration,
});

export default connect(
  mapStateToProps,
  { updateNewMeetingDate, updateNewMeetingTime },
)(MeetingCreator);
