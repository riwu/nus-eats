import React from 'react';
import MeetingsListItem from './MeetingsListItemContainer';
import './MeetingsList.css';

const MeetingsList = ({meetings}) => (
  <div className="MeetingsList">
    {
      meetings.map((meeting) => (
        <MeetingsListItem key={meeting.id} meeting={meeting} />
      ))
    }
  </div>
);

export default MeetingsList;
