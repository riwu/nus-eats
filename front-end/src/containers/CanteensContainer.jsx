import React from 'react';
import { connect } from 'react-redux';
import CanteenPanelContainer from './CanteenPanelContainer';
import CanteenHeaderContainer from './CanteenHeaderContainer';
import StallsContainer from './StallsContainer';

const CanteensContainer = ({ canteens }) => {
  if (!canteens.length) {
    return null;
  }
  return (
    <div>
      {canteens.map(canteen => (
        <CanteenPanelContainer
          header={<CanteenHeaderContainer canteen={canteen} />}
          key={canteen.id}
          canteenId={canteen.id}
        >
          <StallsContainer canteenId={canteen.id} />
        </CanteenPanelContainer>
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
