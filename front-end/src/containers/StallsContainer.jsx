import React from 'react';
import { connect } from 'react-redux';
import StallContainer from './StallContainer';

const style = {
  display: 'flex',
};

const StallsContainer = ({ stalls, canteenID }) => (
  <div style={style}>
    {Object.entries(stalls)
      .filter(([stallID, stall]) => stall.canteen_id === canteenID)
      .map(([stallID, stall]) => (
        <StallContainer stall={stall} key={stallID} />
      ))}
  </div>
);

const mapStateToProps = state => ({
  stalls: state.stalls,
});

export default connect(
    mapStateToProps,
)(StallsContainer);
