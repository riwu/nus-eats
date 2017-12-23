import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const ShareMeetingButton = ({ onClick }) => (
  <Button className="ShareMeetingButton" onClick={ onClick }>
    <Glyphicon glyph="share-alt" />
    { ' ' }
    Share
  </Button>
);

export default ShareMeetingButton;
