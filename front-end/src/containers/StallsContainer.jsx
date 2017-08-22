import React from 'react';
import { connect } from 'react-redux';
import StallContainer from './StallContainer';

const style = {
  display: 'flex',
};

const stallsContainer = ({ stalls, canteenID }) => (
  <div style={style}>
    {stalls.filter(stall => stall.canteenID === canteenID)
           .map(stall => (
             <StallContainer stall={stall} key={stall.id} />
           ))}
  </div>
);

const mapStateToProps = state => ({
  stalls: state.stalls,
});

export default connect(
    mapStateToProps,
)(stallsContainer);
