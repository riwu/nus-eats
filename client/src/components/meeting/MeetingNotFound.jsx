import React from 'react';
import { Link } from 'react-router-dom';
import './MeetingNotFound.css';

const MeetingNotFound = () => (
  <div className="MeetingNotFound">
    <p>
      The meeting you are looking for does not exist.
    </p>

    <p>
      <Link to="/">Back to NUS Eats</Link>
    </p>
  </div>
);

export default MeetingNotFound;
