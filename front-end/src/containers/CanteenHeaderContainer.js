import React from 'react';
import { connect } from 'react-redux';
import CanteenHeader from '../components/CanteenHeader';
import { toggleCanteenPanel } from '../actions';
import MeetingComponent from './MeetingContainer';

const mapDispatchToProps = (dispatch, ownProps) => ({
  canteen: ownProps.canteen,
  toggleCanteenPanel: toggleCanteenPanel(dispatch),
  MeetingComponent: <MeetingComponent canteen={ownProps.canteen} />,
});

export default connect(null, mapDispatchToProps)(CanteenHeader);
