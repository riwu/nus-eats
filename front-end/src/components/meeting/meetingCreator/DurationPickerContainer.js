import { connect } from 'react-redux';
import DurationPicker from './DurationPicker';
import { updateNewMeetingDuration } from '../../../actions';

const mapStateToProps = state => ({
  duration: state.meeting.newMeeting.duration,
});

export default connect(mapStateToProps, { updateDuration: updateNewMeetingDuration })(DurationPicker);
