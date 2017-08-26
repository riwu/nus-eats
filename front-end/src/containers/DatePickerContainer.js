import { connect } from 'react-redux';
import DatePicker from '../components/DatePicker';
import { changeMeetingDate, changeMeetingTime } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  enteredModal: state.meeting.modalEntered,
});


export default connect(mapStateToProps,
  { changeMeetingDate, changeMeetingTime })(DatePicker);
