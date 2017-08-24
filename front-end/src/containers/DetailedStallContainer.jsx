import React from 'react';
import { connect } from 'react-redux';
import DetailedStall from '../components/DetailedStall';
import { toggleStoreView } from '../actions';
import RatingContainer from './RatingContainer';

const mapStateToProps = state => ({
  stall: state.openedStall,
  ratingComponent: state.openedStall
                 ? <RatingContainer useAvgRating={false} />
                 : null,
});

const mapDispatchToProps = dispatch => ({
  toggleStoreView: toggleStoreView(dispatch),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  toggleStoreView: dispatchProps.toggleStoreView(stateProps.stall),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DetailedStall);
