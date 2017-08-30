import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import CanteenHeader from '../components/CanteenHeader';
import MeetingComponent from './MeetingContainer';

const mapDispatchToProps = (dispatch, ownProps) => ({
  canteen: ownProps.canteen,
  toggleCanteenPanel: () => dispatch(
    replace(ownProps.selectedCanteenId === ownProps.canteen.id
      ? '/'
      : `/canteen/${ownProps.canteen.id}`),
    ),
  MeetingComponent: <MeetingComponent canteen={ownProps.canteen} />,
});

export default connect(null, mapDispatchToProps)(CanteenHeader);
