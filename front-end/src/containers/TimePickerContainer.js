import { connect } from 'react-redux';
import TimePicker from '../components/TimePicker';
import { updateNewMeetingTime } from '../actions';

const mapStateToProps = state => ({
  time: state.meeting.newMeeting.time,
});

export default connect(mapStateToProps, { updateTime: updateNewMeetingTime })(TimePicker);
