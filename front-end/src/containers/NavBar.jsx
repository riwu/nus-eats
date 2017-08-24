import React from 'react';
import { connect } from 'react-redux';
import CurrentUserLabel from './CurrentUserLabel';
import LoginButton from './LoginButtonContainer';

// The only purpose of this component is to test the login button and current user label
const NavBar = ({currentUser}) => {
  if (currentUser) {
    return <CurrentUserLabel />;
  } else {
    return <LoginButton />;
  }
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

const NavBarContainer = connect(
  mapStateToProps
)(NavBar);

export default NavBarContainer;
