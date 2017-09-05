import { connect } from 'react-redux';
import TimePicker from './TimePicker';
import { updateNewMeetingTime } from '../../../actions/index';

const mapStateToProps = state => ({
  time: state.meeting.newMeeting.time,
});

export default connect(mapStateToProps, { updateTime: updateNewMeetingTime })(TimePicker);
