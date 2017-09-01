import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import CanteenHeader from '../components/CanteenHeader';
import MeetingComponent from './MeetingContainer';

const mapStateToProps = (state, ownProps) => ({
  stallsCount: Object.values(state.stalls).filter(({ canteenId }) => canteenId === ownProps.canteen.id).length,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  canteen: ownProps.canteen,
  toggleCanteenPanel: () => dispatch(replace(ownProps.isSelected ? '/' : `/canteen/${ownProps.canteen.id}`)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  MeetingComponent: <MeetingComponent canteen={ownProps.canteen} />,
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CanteenHeader);
