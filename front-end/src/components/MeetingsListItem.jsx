import React from 'react';
import ProfilePicture from './ProfilePicture';
import JoinMeetingButton from '../containers/JoinMeetingButtonContainer';
import UnjoinMeetingButton from '../containers/UnjoinMeetingButtonContainer';

const Attendees = ({attendees}) => (
  <span style={{marginLeft: '10px', paddingLeft: '10px', borderLeft: '1px solid gray'}}>
    {
      attendees.map((user) => <ProfilePicture key={user.id} user={user} />)
    }
  </span>
);

const MeetingsListItem = ({meeting, currentUserId}) => {
  const renderJoinButton = () => {
    if (meeting.user_id === currentUserId) {
      return undefined;
    } else if (meeting.attendees.findIndex(({id}) => id === currentUserId) !== -1) {
      return <UnjoinMeetingButton meetingId={meeting.id} />;
    } else {
      return <JoinMeetingButton meetingId={meeting.id} />;
    }
  };

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
        { renderJoinButton() }
      </div>
    </div>
  );
};

export default MeetingsListItem;
