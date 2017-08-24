import { connect } from 'react-redux';
import Meeting from '../components/Meeting';
import { toggleMeetingWindow } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  canteen: ownProps.canteen,
  isOpen: state.meeting === ownProps.canteen.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleMeetingWindow: toggleMeetingWindow(dispatch, ownProps.canteen.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
