import React from 'react';
import { Button } from 'react-bootstrap';
import './CanteenHeader.css';

const CanteenHeader = ({ canteen, stallsCount = 0, toggleCanteenPanel, MeetingComponent }) => (
  <div className="CanteenHeader">
    <div
      style={{backgroundImage: "url('http://loremflickr.com/500/500/dog')"}}
      className="image-container" />

    <div className="content-container">
      <div className="title">
        <div className="name">
          { canteen.name }
        </div>

        <div className="distance">
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

        <div className="ongoing-groups">
        </div>

        <div className="groups-met">
        </div>
      </div>

      <div className="buttons">
        <Button onClick={toggleCanteenPanel}>View Stalls</Button>
        { MeetingComponent }
      </div>
    </div>
  </div>
);

export default CanteenHeader;
