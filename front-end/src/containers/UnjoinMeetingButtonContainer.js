import { connect } from 'react-redux';
import { unjoinMeeting } from '../actions';
import UnjoinMeetingButton from '../components/UnjoinMeetingButton';

const mapStateToProps = (state) => ({
  userId: state.currentUser.id
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

const mergeProps = (stateProps, { dispatch, ...dispatchProps }, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onClick: () => {
    dispatch(unjoinMeeting(ownProps.meetingId, stateProps.userId));
  }
});

const UnjoinMeetingButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UnjoinMeetingButton);

export default UnjoinMeetingButtonContainer;
