import React from 'react';
import { Button } from 'react-bootstrap';
import './CanteenHeader.css';
import Meeting from '../meeting/meetingCreator/MeetingContainer';
import Distance from '../misc/DistanceContainer';

const CanteenHeader = ({ canteenId, canteenName, imageUrl, latitude, longitude, stallsCount = 0, toggleCanteenPanel }) => (
  <div className="CanteenHeader">
    <div
      style={{ backgroundImage: `url('${imageUrl}')` }}
      className="image-container"
    />

    <div className="content-container">
      <div className="title">
        <div className="name">
          { canteenName }
        </div>

        <div className="distance">
          <Distance target={{ latitude, longitude }} />
        </div>
      </div>

      <div className="statistics">
        <div className="stalls-count">
          <div className="number">
            { stallsCount }
          </div>
          <div className="description">
              Canteen Stalls
            </div>
        </div>

        <div className="ongoing-groups" />

        <div className="groups-met" />
      </div>

      <div className="buttons">
        <Button onClick={toggleCanteenPanel}>View Stalls</Button>
        <Meeting canteenId={canteenId} canteenName={canteenName} />
      </div>
    </div>
  </div>
);

export default CanteenHeader;
