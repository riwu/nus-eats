import { connect } from 'react-redux';
import { cancelMeeting } from '../../actions';
import CancelMeetingButton from './CancelMeetingButton';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(cancelMeeting(ownProps.meeting.id)),
});

const CancelMeetingButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelMeetingButton);

export default CancelMeetingButtonContainer;
