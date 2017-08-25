import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Meeting from '../components/Meeting';
import { toggleMeetingWindow } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  canteen: ownProps.canteen,
  isOpen: state.meeting === ownProps.canteen.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleMeetingWindow:
    bindActionCreators(toggleMeetingWindow(ownProps.canteen.id), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);