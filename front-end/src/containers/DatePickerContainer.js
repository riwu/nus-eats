import { connect } from 'react-redux';
import { updateNewMeetingDate, updateNewMeetingTime } from '../actions';
import DatePicker from '../components/DatePicker';

const mapStateToProps = state => ({
  newMeetingDate: state.meeting.newMeeting.date,
  newMeetingTime: state.meeting.newMeeting.time,
  newMeetingDuration: state.meeting.newMeeting.duration,
});

export default connect(
  mapStateToProps,
  { updateNewMeetingDate, updateNewMeetingTime },
)(DatePicker);
