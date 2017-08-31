import React from 'react';
import StallContainer from '../containers/StallContainer';
import './Stalls.css';

const Stalls = ({ stalls, canteenId }) => (
  <div className="Stalls">
    {
      stalls.map((stall) => (
        <StallContainer key={stall.id} stall={stall} canteenId={canteenId} />
      ))
    }
  </div>
);

export default Stalls;
