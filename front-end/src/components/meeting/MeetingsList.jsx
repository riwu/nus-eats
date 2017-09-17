import React from 'react';
import MeetingsListItem from './MeetingsListItemContainer';

const MeetingsList = ({ meetings }) => (
  <div>
    {
      meetings.map(([id, meeting]) => (
        <MeetingsListItem key={id} meeting={meeting} />
      ))
    }
  </div>
);

export default MeetingsList;
