import React from 'react';

const style = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
  cursor: 'pointer',
  width: '200px',
  height: '200px',
};

const Stall = ({ stall, toggleStallView, ratingComponent }) => (
  <div style={style} onClick={toggleStallView}>
    <h3>{stall.name}</h3>
    <div>{stall.description}</div>
    {ratingComponent}
  </div>
);

export default Stall;
