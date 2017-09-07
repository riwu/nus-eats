import { connect } from 'react-redux';
import Meeting from './Meeting';
import { toggleMeetingWindow, createMeeting, login } from '../../../actions';

const mapStateToProps = (state, ownProps) => {
  const meetingCreator = state.meeting.meetingModifier;
  return ({
    canteen: ownProps.canteen,
    isOpen: state.meeting.canteenId === ownProps.canteen.id,
    newMeetingDate: meetingCreator.modifier[0].date,
    newMeetingTime: meetingCreator.modifier[meetingCreator.activeTimeModifierIndex].time,
    newMeetingDuration: meetingCreator.modifier[meetingCreator.activeDurationModifierIndex].duration,
    title: meetingCreator.title,
    description: meetingCreator.description,
    isLoggedIn: !!state.accessTokens.api,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleMeetingWindow: () => dispatch(toggleMeetingWindow(ownProps.canteen.id)),
  createMeeting: meeting => dispatch(createMeeting(meeting)),
  login: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
