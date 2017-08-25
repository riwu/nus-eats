import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Stall from '../components/Stall';
import { toggleStallView } from '../actions';
import RatingContainer from './RatingContainer';

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleStallView: bindActionCreators(toggleStallView, dispatch),
  stall: ownProps.stall,
  ratingComponent: <RatingContainer rating={ownProps.stall.rating} useAvgRating />,
});

export default connect(null, mapDispatchToProps)(Stall);
