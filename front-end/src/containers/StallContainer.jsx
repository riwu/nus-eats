import { connect } from 'react-redux';
import Stall from '../components/Stall';
import { openStoreView } from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  openStoreView: openStoreView(dispatch),
  stall: ownProps.stall,
});

export default connect(null, mapDispatchToProps)(Stall);
