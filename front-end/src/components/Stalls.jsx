import React from 'react';
import Stall from './Stall';
import './Stalls.css';
import RatingContainer from '../containers/RatingContainer';

const Stalls = ({ stalls, canteenId }) => (
  <div className="Stalls">
    {
      stalls.map(stall => (
        <Stall
          key={stall.id}
          stall={stall}
          canteenId={canteenId}
          ratingComponent={<RatingContainer rating={stall.rating} useAvgRating />}
        />
      ))
    }
  </div>
);

export default Stalls;
