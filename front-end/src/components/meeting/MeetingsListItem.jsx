import React from 'react';
import moment from 'moment';
import ProfilePicture from '../facebook/ProfilePicture';
import JoinMeetingButton from './JoinMeetingButtonContainer';
import LeaveMeetingButton from './LeaveMeetingButtonContainer';
import ShareMeetingButton from './ShareMeetingButtonContainer';
import CancelMeetingButton from './CancelMeetingButtonContainer';
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
    if (!currentUserId || meeting.userId === currentUserId) {
      return undefined;
    } else if (meeting.attendees.findIndex(({ id }) => id === currentUserId) !== -1) {
      return <LeaveMeetingButton meetingId={meeting.id} />;
    }
    return <JoinMeetingButton meetingId={meeting.id} />;
  };

  const timeFormat = 'h:mma';
  const date = meeting.startTime.format('ddd, D MMM YY');
  const startTime = meeting.startTime.format(timeFormat);
  const endTime = moment(meeting.startTime).add(meeting.duration).format(timeFormat);
  const attendeesCount = meeting.attendees.length + 1;

  const displayedAttendees = [
    ...meeting.attendees.slice(0, 4),
  ];

  if (meeting.user.id) {
    displayedAttendees.unshift(meeting.user);
  }

  return (
    <div className={isAttending ? 'MeetingsListItem joined' : 'MeetingsListItem'}>
      <div className="left-container">
        <div className="title">
          { meeting.title }
          { !!meeting.deletedAt && <span className="cancelled"> (Cancelled)</span> }
        </div>

        <div className="details">
          <div>{ meeting.canteen && meeting.canteen.name }</div>
          <div>{ date }</div>
          <div>
            { `${startTime} - ${endTime}` }
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
          { meeting.id < 10000000 && !meeting.deletedAt && renderJoinButton() }
          {
            meeting.id < 10000000 && !meeting.deletedAt &&
            <ShareMeetingButton meeting={meeting} />
          }
          {
            meeting.userId === currentUserId && !meeting.deletedAt && meeting.id < 10000000 &&
            <CancelMeetingButton meeting={meeting} />
          }
        </div>
      </div>
    </div>
  );
};

export default MeetingsListItem;
