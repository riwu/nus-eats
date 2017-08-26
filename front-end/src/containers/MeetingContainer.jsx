import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Meeting from '../components/Meeting';
import { toggleMeetingWindow, createMeeting } from '../actions';
import DatePickerComponent from './DatePickerContainer';
import MeetingDatesComponent from './MeetingDatesContainer';

const mapStateToProps = (state, ownProps) => ({
  canteen: ownProps.canteen,
  isOpen: state.meeting.canteenID === ownProps.canteen.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleMeetingWindow:
    bindActionCreators(toggleMeetingWindow(ownProps.canteen.id), dispatch),
  createMeeting: bindActionCreators(createMeeting, dispatch),
  DatePickerComponent,
  MeetingDatesComponent,
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
