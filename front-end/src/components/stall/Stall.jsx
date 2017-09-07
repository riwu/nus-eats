import React from 'react';
import { Link } from 'react-router-dom';
import './Stall.css';
import RatingContainer from './RatingContainer';

const Stall = ({ stall, canteenId }) => (
  <Link className="Stall" to={`/canteen/${canteenId}/stall/${stall.id}`}>
    <div
      style={{ backgroundImage: `url('${stall.imageUrl}')` }}
      className="image-container"
    />

    <div className="overlay" />

    <div className="content-container">
      <div>{stall.name}</div>
      <RatingContainer rating={Number(stall.averageRating)} useAvgRating />
    </div>
  </Link>
);

export default Stall;
