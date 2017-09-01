import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import DetailedStall from '../components/DetailedStall';
import RatingContainer from './RatingContainer';

const mapStateToProps = (state, ownProps) => {
  const openedStall = state.stalls[ownProps.match.params.stallId];
  return {
    stall: openedStall,
    ratingComponent: openedStall
                   ? <RatingContainer useAvgRating={false} stall={openedStall} />
                   : null,
  };
};

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(goBack()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailedStall);
