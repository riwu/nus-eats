import { connect } from 'react-redux';
import MeetingsList from '../components/MeetingsList';

const mapStateToProps = (state) => ({
  meetings: state.meeting.meetings
});

const MeetingsListContainer = connect(
  mapStateToProps
)(MeetingsList);

export default MeetingsListContainer;
