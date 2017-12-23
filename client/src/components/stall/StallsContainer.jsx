import { connect } from 'react-redux';
import Stalls from './Stalls';

const mapStateToProps = (state, { canteenId }) => ({
  stalls: Object.values(state.stalls).filter(stall => stall.canteenId === canteenId),
});

export default connect(
    mapStateToProps,
)(Stalls);
