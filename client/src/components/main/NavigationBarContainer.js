import { connect } from 'react-redux';
import { logout, toggleFeed } from '../../actions';
import NavigationBar from './NavigationBar';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
  toggleFeed: () => dispatch(toggleFeed()),
});

const NavigationBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

export default NavigationBarContainer;
