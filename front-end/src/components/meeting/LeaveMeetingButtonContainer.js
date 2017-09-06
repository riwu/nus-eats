import { connect } from 'react-redux';
import { unjoinMeeting } from '../../actions';
import LeaveMeetingButton from './LeaveMeetingButton';

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

const LeaveMeetingButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(LeaveMeetingButton);

export default LeaveMeetingButtonContainer;
