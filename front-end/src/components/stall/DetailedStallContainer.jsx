import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DetailedStall from './DetailedStall';

const mapStateToProps = (state, ownProps) => ({
  stall: state.stalls[ownProps.stallId],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // cannot use goBack() as user might navigate to it directly with url
  closeModal: () => dispatch(push(ownProps.canteenPath)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailedStall);
