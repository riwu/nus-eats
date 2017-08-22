import React from 'react';

const style = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
};

const Stall = ({ stall, openStoreView }) => (
  <div style={style} onClick={() => openStoreView(stall)}>
    <h3>{stall.name}</h3>
    <div>{stall.description}</div>
  </div>
);

export default Stall;
