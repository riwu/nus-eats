import React from 'react';
import { Button } from 'react-bootstrap';

const LoginButton = ({ isLoggingIn, ...props }) => (
  <Button disabled={ isLoggingIn } {...props}>{ isLoggingIn ? 'Loading...' : 'Login' }</Button>
);

export default LoginButton;
