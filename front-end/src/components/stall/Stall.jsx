import React from 'react';
import { Link } from 'react-router-dom';
import './Stall.css';
import RatingContainer from '../containers/RatingContainer';

const Stall = ({ stall, canteenId }) => (
  <Link className="Stall" to={`/canteen/${canteenId}/stall/${stall.id}`}>
    <div
      style={{ backgroundImage: "url('http://loremflickr.com/250/250/dog" }}
      className="image-container"
    />

    <div className="overlay" />

    <div className="content-container">
      <div>{stall.name}</div>
      <RatingContainer rating={stall.rating} useAvgRating />
    </div>
  </Link>
);

export default Stall;
