import { connect } from 'react-redux';
import DetailedStall from '../components/DetailedStall';
import { closeStoreView } from '../actions';

const mapStateToProps = state => ({
  stall: state.openedStall,
});

export default connect(
  mapStateToProps,
  { closeStoreView },
)(DetailedStall);
