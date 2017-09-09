import { connect } from 'react-redux';
import { setNotFirstTimeVisit } from '../../actions';
import LandingModal from './LandingModal';

const mapStateToProps = state => ({
  isOpen: !state.notFirstTimeVisit,
});

export default connect(
  mapStateToProps,
  { setNotFirstTimeVisit },
)(LandingModal);
