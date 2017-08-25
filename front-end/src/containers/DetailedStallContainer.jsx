import React from 'react';
import { connect } from 'react-redux';
import DetailedStall from '../components/DetailedStall';
import { toggleStallView } from '../actions';
import RatingContainer from './RatingContainer';

const mapStateToProps = state => ({
  stall: state.openedStall,
  ratingComponent: state.openedStall
                 ? <RatingContainer useAvgRating={false} />
                 : null,
});

export default connect(
  mapStateToProps,
  { toggleStallView },
)(DetailedStall);
