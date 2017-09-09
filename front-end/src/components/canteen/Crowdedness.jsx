import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import crowdedness from './crowdedness.jpg';

const getStyle = (value) => {
  switch (true) {
    case value <= 60:
      return 'success';
    case value < 80:
      return 'warning';
    default:
      return 'danger';
  }
};

const Crowdedness = ({ value }) => {
  const now = Math.round(value * 100 || 0);
  return (
    <div>
      <img
        alt="Crowdedness Icon"
        src={crowdedness}
        style={{ width: '20px' }}
      />
      {' Crowdedness'}
      <ProgressBar
        now={now}
        label={<div style={{ color: 'lightgrey' }}>{now}%</div>}
        bsStyle={getStyle(now)}
      />
    </div>
  );
};

export default Crowdedness;
