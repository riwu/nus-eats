import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import MeetingsListContainer from '../meeting/MeetingsListContainer';
import './Feed.css';

const Feed = ({expanded, closeFeed}) => (
  <div className={ expanded ? 'Feed expanded' : 'Feed' }>
    <div className="content">
      <div onClick={closeFeed} className="close-button">
        <div className="glyph-container">
          <Glyphicon glyph="remove" />
        </div>
      </div>

      <div className="title">
        NUS Eats Feed
      </div>

      <div className="subtitle">
        Discover · Socialise
      </div>

      <MeetingsListContainer />
    </div>
  </div>
);

export default Feed;
