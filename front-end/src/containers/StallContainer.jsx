import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Stall from '../components/Stall';
import RatingContainer from './RatingContainer';

const mapDispatchToProps = (dispatch, ownProps) => {
  const stall = ownProps.stall;
  return ({
    toggleStallView: () => dispatch(push(`/stall/${stall.id}`)),
    stall,
    ratingComponent: <RatingContainer rating={stall.rating} useAvgRating />,
  });
};

export default connect(null, mapDispatchToProps)(Stall);
