import { connect } from 'react-redux';
import { initializeGeolocation } from '../../actions';
import Distance from './Distance';

const mapStateToProps = (state) => ({
  isAvailable: state.geolocation.isAvailable,
  permission: state.geolocation.permission,
  coordinates: state.geolocation.coordinates,
});

const mapDispatchToProps = (dispatch) => ({
  initializeGeolocation: () => dispatch(initializeGeolocation()),
});

const DistanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Distance);

export default DistanceContainer;
