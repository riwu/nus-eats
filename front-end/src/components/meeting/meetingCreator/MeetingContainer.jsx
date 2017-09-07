import { connect } from 'react-redux';
import Meeting from './Meeting';
import { toggleMeetingWindow, createMeeting } from '../../../actions';

const mapStateToProps = (state, ownProps) => {
  const meetingModifier = state.meeting.meetingModifier;
  return ({
    canteen: ownProps.canteen,
    isOpen: state.meeting.canteenId === ownProps.canteen.id,
    newMeetingDate: meetingModifier.modifier[0].date,
    newMeetingTime: meetingModifier.modifier[meetingModifier.activeTimeModifierIndex].time,
    newMeetingDuration: meetingModifier.modifier[meetingModifier.activeDurationModifierIndex].duration,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleMeetingWindow: () => dispatch(toggleMeetingWindow(ownProps.canteen.id)),
  createMeeting: meeting => dispatch(createMeeting(meeting)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
