import React from 'react';
import { Image, Glyphicon, OverlayTrigger, Popover } from 'react-bootstrap';
import LoginButton from '../facebook/LoginButtonContainer';
import LogoutButton from '../facebook/LogoutButtonContainer';
import logo from '../../images/logo.jpg';
import './NavigationBar.css';

const NavigationBar = ({ currentUser, onLogin, onLogout }) => {
  let content;

  if (currentUser) {
    const popover = (
      <Popover id="user-popover" className="user-popover">
        Hi there, { currentUser.name }!
        <br />
        Welcome to NUS Eats!
        <br />
        <LogoutButton className="btn-shadow btn-logout" />
      </Popover>
    );

    content = (
      <div className="content">
        <OverlayTrigger trigger="click" placement="bottom" overlay={ popover }>
          <span className="popover-trigger">
            <Image className="profile-picture" src={`https://graph.facebook.com/${currentUser.id}/picture`} />
            <span className="name-container">
              <span className="hidden-xs">
                { currentUser.name }
              </span>
              <span className="caret" />
            </span>
          </span>
        </OverlayTrigger>
        <span className="hamburger-container">
          <Glyphicon className="hamburger" glyph="menu-hamburger" />
        </span>
      </div>
    );
  } else {
    content = (
      <div className="content">
        <LoginButton className="btn-shadow btn-login" />
      </div>
    );
  }

  return (
    <div className="NavigationBar">
      <Image src={logo} />
      { content }
    </div>
  );
};

export default NavigationBar;
