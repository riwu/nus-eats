import React from 'react';
import { Link } from 'react-router-dom';
import './Stall.css';
import Rating from './Rating';

const Stall = ({ stall, canteenId }) => (
  <Link className="Stall" to={`/canteen/${canteenId}/stall/${stall.id}`}>
    <div
      style={{ backgroundImage: `url('${stall.imageUrl}')` }}
      className="image-container"
    />

    <div className="overlay" />

    <div className="content-container">
      <div>{stall.name}</div>
      <Rating value={Number(stall.averageRating)} readonly />
    </div>
  </Link>
);

export default Stall;
