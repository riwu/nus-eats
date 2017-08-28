import { connect } from 'react-redux';
import LogoutButton from '../components/LogoutButton';
import { logout } from '../actions';

const mapStateToProps = (state) => ({
});

const LogoutButtonContainer = connect(
  mapStateToProps,
  { onClick: logout }
)(LogoutButton);

export default LogoutButtonContainer;
