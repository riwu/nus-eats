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
      {canteens.map((canteen) => {
        const isSelected = canteen.id === selectedCanteenIdNum;
        return (
          <CanteenPanelContainer
            header={
              <CanteenHeaderContainer
                canteen={canteen}
                isSelected={isSelected}
              />
            }
            key={canteen.id}
            canteenId={canteen.id}
            expanded={isSelected}
          >
            <div className="arrow" />
            <StallsContainer canteenId={canteen.id} />
          </CanteenPanelContainer>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  canteens: state.canteens,
  selectedCanteenId: ownProps.selectedCanteenId,
});

export default connect(
  mapStateToProps,
)(CanteensContainer);
