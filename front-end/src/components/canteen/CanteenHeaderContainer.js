import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import CanteenHeader from './CanteenHeader';

const mapStateToProps = (state, ownProps) => ({
  stallsCount: Object.values(state.stalls).filter(({ canteenId }) => canteenId === ownProps.canteen.id).length,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  canteenName: ownProps.canteen.name,
  canteenId: ownProps.canteen.id,
  latitude: ownProps.canteen.latitude,
  longitude: ownProps.canteen.longitude,
  toggleCanteenPanel: () => dispatch(replace(ownProps.isSelected ? '/' : `/canteen/${ownProps.canteen.id}`)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanteenHeader);
