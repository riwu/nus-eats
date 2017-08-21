import React from 'react';
import { connect } from 'react-redux';
import CanteenPanel from '../components/CanteenPanel';
import Stall from '../components/Stall';

const CanteensContainer = ({ canteens, stalls }) => {
  if (!canteens.length) {
    return null;
  }
  return (
    <div>
      {canteens.map(canteen => (
        <CanteenPanel
          header={(
            <div>
              <h3>{canteen.name}</h3>
              <div>{canteen.description}</div>
            </div>
          )}
          key={canteen.id}
        >
          {stalls.filter(stall => stall.canteenID === canteen.id)
                 .map(stall => (
                   <Stall title={stall.name} key={stall.id}>
                     {stall.description}
                   </Stall>
                 ))}
        </CanteenPanel>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  canteens: state.canteens,
  stalls: state.stalls,
});

export default connect(
  mapStateToProps,
)(CanteensContainer);
