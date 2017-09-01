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

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeModal: () => dispatch(push(ownProps.canteenPath)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailedStall);
