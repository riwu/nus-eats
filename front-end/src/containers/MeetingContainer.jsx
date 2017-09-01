import { connect } from 'react-redux';
import Meeting from '../components/Meeting';
import { toggleMeetingWindow, createMeeting } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  canteen: ownProps.canteen,
  isOpen: state.meeting.canteenId === ownProps.canteen.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleMeetingWindow: () => dispatch(toggleMeetingWindow(ownProps.canteen.id)),
  createMeeting: createMeeting(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
