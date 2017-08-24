import React from 'react';

const style = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
  cursor: 'pointer',
};

const Stall = ({ stall, toggleStoreView, ratingComponent }) => (
  <div style={style} onClick={toggleStoreView}>
    <h3>{stall.name}</h3>
    <div>{stall.description}</div>
    {ratingComponent}
  </div>
);

export default Stall;
