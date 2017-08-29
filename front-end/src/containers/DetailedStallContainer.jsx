import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DetailedStall from '../components/DetailedStall';
import RatingContainer from './RatingContainer';

const mapStateToProps = (state, ownProps) => {
  const openedStall = state.stalls[ownProps.stallId];
  return {
    stall: openedStall,
    ratingComponent: openedStall
                   ? <RatingContainer useAvgRating={false} stall={openedStall} />
                   : null,
  };
};

export default connect(
  mapStateToProps,
  { toggleStallView: () => push('/') },
)(DetailedStall);
