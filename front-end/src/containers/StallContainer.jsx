import React from 'react';
import { connect } from 'react-redux';
import Stall from '../components/Stall';
import { openStoreView } from '../actions';
import RatingContainer from './RatingContainer';

const mapDispatchToProps = (dispatch, ownProps) => ({
  openStoreView: openStoreView(dispatch),
  stall: ownProps.stall,
  ratingComponent: <RatingContainer rating={ownProps.stall.rating} readonly />,
});

export default connect(null, mapDispatchToProps)(Stall);
