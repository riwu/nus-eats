import React from 'react';
import { connect } from 'react-redux';
import Canteens from '../components/Canteens';

const CanteensContainer = ({ canteens, stalls }) => {
  if (!canteens.length) {
    return null;
  }
  return (
    <Canteens canteens={canteens} stalls={stalls} />
  );
};

const mapStateToProps = state => ({
  canteens: state.canteens,
  stalls: state.stalls,
});

export default connect(
  mapStateToProps,
)(CanteensContainer);
