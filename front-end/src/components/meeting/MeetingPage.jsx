import React from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../main/NavigationBarContainer';
import MeetingPageContent from './MeetingPageContent';
import MeetingNotFound from './MeetingNotFound';
import LoadingMeeting from './LoadingMeeting';
import './MeetingPage.css';

const MeetingPage = ({ meeting, notFound }) => {
  let header, content;

  if (meeting) {
    header = (
      <Helmet>
        <meta property="og:url" content={ `${window.location.origin}/meetings/${meeting.id}` } />
        {
          meeting.canteen &&
          <meta property="og:title" content={ meeting.title } />
        }
        {
          meeting.canteen &&
          <meta property="og:description" content={ meeting.description} />
        }
      </Helmet>
    );

    content = <MeetingPageContent meeting={meeting} />;
  } else if (notFound) {
    content = <MeetingNotFound />;
  } else {
    content = <LoadingMeeting />;
  }

  return (
    <div className="MeetingPage">
      { header }
      <NavigationBar />
      { content }
    </div>
  );
};

export default MeetingPage;
