import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import LandingModal from './LandingModal';

const mapStateToProps = (state, ownProps) => ({
  stallsCount: Object.values(state.stalls).filter(({ canteenId }) => canteenId === ownProps.canteen.id).length,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const canteen = ownProps.canteen;
  return {
    canteenName: canteen.name,
    canteenId: canteen.id,
    crowdedness: canteen.crowdValue,
    latitude: canteen.latitude,
    longitude: canteen.longitude,
    imageUrl: canteen.imageUrl,
    toggleCanteenPanel: () => dispatch(replace(ownProps.isSelected ? '/' : `/canteen/${canteen.id}`)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingModal);
