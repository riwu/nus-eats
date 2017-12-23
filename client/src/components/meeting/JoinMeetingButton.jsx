import React from 'react';
import { Button } from 'react-bootstrap';

const JoinMeetingButton = ({onClick}) => (
  <Button className="JoinMeetingButton" onClick={onClick}>Join Group</Button>
);

export default JoinMeetingButton;
