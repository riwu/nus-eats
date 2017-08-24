import React from 'react';

const style = {
  display: 'flex',
};

const clickableStyle = {
  width: '100%',
};

const titleStyle = {
  fontSize: '25px',
};

const CanteenHeader = ({ canteen, toggleCanteenPanel, MeetingComponent }) => (
  <div style={style}>
    <div onClick={() => toggleCanteenPanel(canteen.id)} style={clickableStyle}>
      <div style={titleStyle}>{canteen.name}</div>
      <div>{canteen.description}</div>
    </div>
    {MeetingComponent}
  </div>
);

export default CanteenHeader;
