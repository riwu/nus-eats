import { connect } from 'react-redux';
import LoginButton from '../components/LoginButton';
import { login } from '../actions';

const mapStateToProps = (state) => ({
  isLoggingIn: state.isLoggingIn,
  isFacebookReady: state.isFacebookReady,
});

const LoginButtonContainer = connect(
  mapStateToProps,
  { onClick: login }
)(LoginButton);

export default LoginButtonContainer;
