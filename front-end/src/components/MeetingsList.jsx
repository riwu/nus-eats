import React from 'react';
import MeetingsListItem from '../containers/MeetingsListItemContainer';

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
