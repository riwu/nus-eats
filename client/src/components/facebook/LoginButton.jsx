import React from 'react';
import { Button } from 'react-bootstrap';

const LoginButton = ({ isLoggingIn, isFacebookReady, ...props }) => {
  const loading = isLoggingIn || !isFacebookReady;

  return (
    <Button disabled={ loading } {...props}>
      { loading ? 'Loading...' : 'Login' }
    </Button>
  );
};

export default LoginButton;
