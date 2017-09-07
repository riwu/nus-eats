import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './Distance.css';

const distanceBetweenPoints = (a, b) => {
  // Shamelessly copied from https://stackoverflow.com/a/27943/211319

  const deg2rad = (deg) => deg * (Math.PI/180);

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(a.latitude-b.latitude);
  const dLon = deg2rad(a.longitude-b.longitude);
  const x =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(a.latitude)) * Math.cos(deg2rad(b.latitude)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
  const d = R * c * 1000; // Distance in m
  return d;
};

const Distance = ({ isAvailable, permission, initializeGeolocation, coordinates, target }) => {
  if (!isAvailable || permission === 'denied') {
    return null;
  }

  let content;
  if (permission === 'unknown') {
    return (
      <div className="Distance prompt">
        <span onClick={initializeGeolocation}>How far away?</span>
      </div>
    );
  } else if (permission === 'pending' || !coordinates) {
    return (
      <div className="Distance">
        <span>Please wait...</span>
      </div>
    );
  } else {
    const distance = distanceBetweenPoints(coordinates, target);
    const walkingSpeed = 5000 / 60; // m / min
    const time = distance / walkingSpeed;
    const estimatedTime = Math.ceil(time / 5) * 5;

    return (
      <div className="Distance">
        <Glyphicon glyph="time" />{ ' ' }{ estimatedTime } mins away
      </div>
    );
  }
};

export default Distance;
