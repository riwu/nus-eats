import { connect } from 'react-redux';
import MeetingsListItem from './MeetingsListItem';

const mapStateToProps = (state) => ({
  currentUserId: (state.currentUser || {}).id,
});

const MeetingPageContent = connect(
  mapStateToProps
)(MeetingsListItem);

export default MeetingPageContent;
