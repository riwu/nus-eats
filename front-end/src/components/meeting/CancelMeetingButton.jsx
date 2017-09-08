import React from 'react';
import { Button } from 'react-bootstrap';

const CancelMeetingButton = ({ onClick }) => (
  <Button onClick={ onClick }>Cancel</Button>
);

export default CancelMeetingButton;
