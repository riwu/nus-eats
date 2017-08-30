import { connect } from 'react-redux';
import MeetingsList from '../components/MeetingsList';

const mapStateToProps = (state) => ({
  meetings: Object.values(state.meeting.meetings)
});

const MeetingsListContainer = connect(
  mapStateToProps
)(MeetingsList);

export default MeetingsListContainer;
