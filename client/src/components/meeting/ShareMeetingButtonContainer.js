import React from 'react';
import { shareMeeting } from '../../actions';
import ShareMeetingButton from './ShareMeetingButton';

const ShareMeetingButtonContainer = ({ meeting }) => (
  <ShareMeetingButton onClick={() => shareMeeting(meeting)} />
);

export default ShareMeetingButtonContainer;
