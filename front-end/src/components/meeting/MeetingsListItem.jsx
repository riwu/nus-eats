import React from 'react';
import moment from 'moment';
import ProfilePicture from '../facebook/ProfilePicture';
import JoinMeetingButton from './JoinMeetingButtonContainer';
import LeaveMeetingButton from './LeaveMeetingButtonContainer';
import './MeetingsListItem.css';

const Attendees = ({ attendees }) => (
  <span className="Attendees">
    {
      attendees.map(user => <ProfilePicture key={user.id} user={user} size={30} />)
    }
  </span>
);

const MeetingsListItem = ({ meeting, currentUserId }) => {
  const isAttending = (meeting.userId === currentUserId) ||
                      meeting.attendees.findIndex(({ id }) => id === currentUserId) !== -1;

  const renderJoinButton = () => {
    if (meeting.userId === currentUserId) {
      return undefined;
    } else if (meeting.attendees.findIndex(({ id }) => id === currentUserId) !== -1) {
      return <LeaveMeetingButton meetingId={meeting.id} />;
    }
    return <JoinMeetingButton meetingId={meeting.id} />;
  };

  const date = meeting.startTime.format('MMMM D, YYYY');
  const startTime = meeting.startTime.format('HHmm');
  const endTime = moment(meeting.startTime).add(meeting.duration).format('HHmm');
  const attendeesCount = meeting.attendees.length + 1;

  const displayedAttendees = [
    ...meeting.attendees.slice(0, 4),
  ];

  if (meeting.user.id) {
    displayedAttendees.unshift(meeting.user);
  }

  return (
    <div className="MeetingsListItem">
      <div className="left-container">
        <div className="title">
          { meeting.title }
        </div>

        <div className="details">
          <div>{ meeting.canteen.name }</div>
          <div>{ date }</div>
          <div>
            { `${startTime} hours - ${endTime} hours` }
          </div>
        </div>

        <div className="attendees">
          <div className="attendees-count">
            { `${attendeesCount} Going` }
            { isAttending && <span className="going"> (You are going)</span> }
          </div>
          <div>
            <Attendees attendees={displayedAttendees} />
          </div>
        </div>
      </div>

      <div className="right-container">
        <div className="description">
          { meeting.description }
        </div>

        <div className="buttons">
          { renderJoinButton() }
        </div>
      </div>
    </div>
  );
};

export default MeetingsListItem;
