import React from 'react';
import MeetingsListItem from './MeetingsListItemContainer';

const MeetingsList = ({meetings}) => (
  <div>
    {
      meetings.map((meeting) => (
        <MeetingsListItem key={meeting.id} meeting={meeting} />
      ))
    }
  </div>
);

export default MeetingsList;
