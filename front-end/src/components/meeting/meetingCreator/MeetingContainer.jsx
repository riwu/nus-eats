import { connect } from 'react-redux';
import Meeting from './Meeting';
import { toggleMeetingWindow, createMeeting, login } from '../../../actions';

const mapStateToProps = (state, ownProps) => {
  const meetingCreator = state.meeting.meetingModifier;
  return ({
    canteenId: ownProps.canteenId,
    canteenName: ownProps.canteenName,
    isOpen: state.meeting.canteenId === ownProps.canteenId,
    newMeetingDate: meetingCreator.modifier[0].date,
    newMeetingTime: meetingCreator.modifier[meetingCreator.activeTimeModifierIndex].time,
    newMeetingDuration: meetingCreator.modifier[meetingCreator.activeDurationModifierIndex].duration,
    title: meetingCreator.title,
    titlePlaceholder: meetingCreator.titlePlaceholder,
    description: meetingCreator.description,
    isLoggedIn: !!state.accessTokens.api,
    userId: (state.currentUser || {}).id,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleMeetingWindow: () => dispatch(toggleMeetingWindow(ownProps.canteenId)),
  createMeeting: meeting => dispatch(createMeeting(meeting)),
  login: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
