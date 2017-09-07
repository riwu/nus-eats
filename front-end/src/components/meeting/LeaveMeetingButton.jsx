import React from 'react';
import { Button } from 'react-bootstrap';

const LeaveMeetingButton = ({onClick}) => (
  <Button className="LeaveMeetingButton" onClick={onClick}>Leave Group</Button>
);

export default LeaveMeetingButton;
