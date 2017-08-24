import React from 'react';
import { connect } from 'react-redux';
import Stall from '../components/Stall';
import { toggleStoreView } from '../actions';
import RatingContainer from './RatingContainer';

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleStoreView: toggleStoreView(dispatch)(ownProps.stall),
  stall: ownProps.stall,
  ratingComponent: <RatingContainer rating={ownProps.stall.rating} useAvgRating />,
});

export default connect(null, mapDispatchToProps)(Stall);
