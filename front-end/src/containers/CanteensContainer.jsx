import React from 'react';
import { connect } from 'react-redux';
import Accordion from '../components/Accordion';
import CanteenPanel from '../components/CanteenPanel';
import Stall from '../components/Stall';

const CanteensContainer = ({ canteens, stalls }) => {
  if (!canteens.length) {
    return null;
  }
  return (
    <Accordion>
      {canteens.map(canteen => (
        <CanteenPanel header={canteen.name} key={canteen.id}>
          {stalls.filter(stall => stall.canteenID === canteen.id)
                 .map(stall => (
                   <Stall title={stall.name} key={stall.id}>
                     {stall.description}
                   </Stall>
                 ))}
        </CanteenPanel>
      ))}
    </Accordion>
  );
};

const mapStateToProps = state => ({
  canteens: state.canteens,
  stalls: state.stalls,
});

export default connect(
  mapStateToProps,
)(CanteensContainer);
