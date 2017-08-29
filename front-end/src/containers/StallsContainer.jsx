import React from 'react';
import { connect } from 'react-redux';
import StallContainer from './StallContainer';

const style = {
  display: 'flex',
  flexWrap: 'wrap',
};

const StallsContainer = ({ stalls, canteenId }) => (
  <div style={style}>
    {Object.entries(stalls)
      .filter(([stallId, stall]) => stall.canteenId === canteenId)
      .map(([stallId, stall]) => (
        <StallContainer stall={stall} key={stallId} />
      ))}
  </div>
);

const mapStateToProps = state => ({
  stalls: state.stalls,
});

export default connect(
    mapStateToProps,
)(StallsContainer);
