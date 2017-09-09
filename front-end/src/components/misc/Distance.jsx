import React from 'react';
import { Image } from 'react-bootstrap';
import walk from '../../images/walk.png';
import place from '../../images/place.png';
import './Distance.css';

const distanceBetweenPoints = (a, b) => {
  // Shamelessly copied from https://stackoverflow.com/a/27943/211319

  const deg2rad = deg => deg * (Math.PI / 180);

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(a.latitude - b.latitude);
  const dLon = deg2rad(a.longitude - b.longitude);
  const x =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(a.latitude)) * Math.cos(deg2rad(b.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  const d = R * c * 1000; // Distance in m
  return d;
};

const Distance = ({ isAvailable, permission, initializeGeolocation, coordinates, target }) => {
  if (!isAvailable || permission === 'denied') {
    return null;
  }

  if (permission === 'unknown') {
    return (
      <div className="Distance prompt">
        <span onClick={initializeGeolocation}>
          <Image src={place} style={{ width: '10px', height: '10px' }} />
          { ' ' }
          How far?
        </span>
      </div>
    );
  } else if (permission === 'pending' || !coordinates) {
    return (
      <div className="Distance">
        <span>Please wait...</span>
      </div>
    );
  }
  const distance = distanceBetweenPoints(coordinates, target);
  const walkingSpeed = 5000 / 60; // m / min
  const time = distance / walkingSpeed;
  const estimatedTime = Math.ceil(time / 5) * 5;
  const estimatedDistance = Math.ceil(distance / 100) * 100;

  return (
    <div className="Distance">
      <Image src={walk} style={{ width: '10px', height: '10px' }} />
      {` ${estimatedTime} min (${estimatedDistance < 1000
        ? `${estimatedDistance}m` : `${estimatedDistance / 1000}km`})`}
    </div>
  );
};

export default Distance;
