import React from 'react';
import { Panel } from 'react-bootstrap';

const CanteenPanel = ({ header, children }) => (
  <Panel header={header} eventKey="1" bsStyle="info">
    {children}
  </Panel>
);

export default CanteenPanel;
