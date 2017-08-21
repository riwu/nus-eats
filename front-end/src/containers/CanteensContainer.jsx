import React from 'react';
import { connect } from 'react-redux';
import CanteenPanel from '../components/CanteenPanel';
import CanteenHeader from '../components/CanteenHeader';
import StallsContainer from './StallsContainer';

const CanteensContainer = ({ canteens }) => {
  if (!canteens.length) {
    return null;
  }
  return (
    <div>
      {canteens.map(canteen => (
        <CanteenPanel
          header={<CanteenHeader title={canteen.name} >{canteen.description}</CanteenHeader>}
          key={canteen.id}
        >
          <StallsContainer canteenID={canteen.id} />
        </CanteenPanel>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  canteens: state.canteens,
});

export default connect(
  mapStateToProps,
)(CanteensContainer);
