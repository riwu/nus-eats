import React from 'react';
import Stall from './Stall';
import './Stalls.css';

const Stalls = ({ stalls, canteenId }) => (
  <div className="Stalls">
    {
      stalls.map(stall => (
        <Stall
          key={stall.id}
          stall={stall}
          canteenId={canteenId}
        />
      ))
    }
  </div>
);

export default Stalls;
