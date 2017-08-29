import React from 'react';
import ProfilePicture from './ProfilePicture';
import JoinMeetingButton from '../containers/JoinMeetingButtonContainer';

const Attendees = ({attendees}) => (
  <span style={{marginLeft: '10px', paddingLeft: '10px', borderLeft: '1px solid gray'}}>
    {
      attendees.map((user) => <ProfilePicture key={user.id} user={user} />)
    }
  </span>
);

const MeetingsListItem = ({meeting}) => {
  return (
    <div>
      <div>
        {meeting.canteen.name}
      </div>
      <div>
        By
        <ProfilePicture user={meeting.user} />
        <Attendees attendees={meeting.attendees} />
      </div>
      <div>
        <JoinMeetingButton meetingId={meeting.id} />
      </div>
    </div>
  );
};

export default MeetingsListItem;
