import { connect } from 'react-redux';
import { updateNewMeetingDate } from '../actions';
import DatePicker from '../components/DatePicker';

const mapStateToProps = (state, ownProps) => ({
  newMeetingDate: state.meeting.newMeetingDate,
  updateNewMeetingTime: ownProps.updateNewMeetingTime,
});

export default connect(
  mapStateToProps,
  { updateNewMeetingDate },
)(DatePicker);
