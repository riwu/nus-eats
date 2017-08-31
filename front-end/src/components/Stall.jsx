import React from 'react';
import { Image } from 'react-bootstrap';
import './Stall.css';

const Stall = ({ stall, toggleStallView, ratingComponent }) => (
  <div className="Stall" onClick={toggleStallView}>
    <div className="image-container">
      <Image src="http://loremflickr.com/250/250/dog" />
    </div>

    <div className="overlay" />

    <div className="content-container">
      <div>{stall.name}</div>
      {ratingComponent}
    </div>
  </div>
);

export default Stall;
