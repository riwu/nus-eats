import { connect } from 'react-redux';
import { joinMeeting } from '../actions';
import JoinMeetingButton from '../components/JoinMeetingButton';

const mapStateToProps = (state) => ({
  userId: state.currentUser.id
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

const mergeProps = (stateProps, { dispatch, ...dispatchProps }, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onClick: () => {
      dispatch(joinMeeting(ownProps.meetingId, stateProps.userId));
    }
  };
};

const JoinMeetingButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(JoinMeetingButton);

export default JoinMeetingButtonContainer;
