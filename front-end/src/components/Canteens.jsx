import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import Stall from './Stall';

const CanteenPanel = ({ canteens, stalls }) => (
  <Accordion>
    {canteens.map(canteen => (
      <Panel header={canteen.name} eventKey={canteen.id} key={canteen.id} bsStyle="info">
        {stalls.filter(stall => stall.canteenID === canteen.id)
               .map(stall => (
                 <Stall title={stall.name} key={stall.id}>
                   {stall.description}
                 </Stall>
               ))}
      </Panel>
    ))}
  </Accordion>
);

export default CanteenPanel;
