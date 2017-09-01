import React from 'react';
import { connect } from 'react-redux';
import CanteenPanelContainer from './CanteenPanelContainer';
import CanteenHeaderContainer from './CanteenHeaderContainer';
import StallsContainer from './StallsContainer';

const CanteensContainer = ({ canteens, selectedCanteenId }) => {
  if (!canteens.length) {
    return null;
  }
  const selectedCanteenIdNum = Number(selectedCanteenId);
  return (
    <div>
      {canteens.map(canteen => (
        <CanteenPanelContainer
          header={
            <CanteenHeaderContainer
              canteen={canteen}
              selectedCanteenId={selectedCanteenIdNum}
            />
          }
          key={canteen.id}
          canteenId={canteen.id}
          expanded={canteen.id === selectedCanteenIdNum}
        >
          <div className="arrow" />
          <StallsContainer canteenId={canteen.id} />
        </CanteenPanelContainer>
      ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  canteens: state.canteens,
  selectedCanteenId: ownProps.canteenId,
});

export default connect(
  mapStateToProps,
)(CanteensContainer);
