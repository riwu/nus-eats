import React from 'react';

const style = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
};

const Stall = ({ title, children }) => (
  <div style={style}>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

export default Stall;
