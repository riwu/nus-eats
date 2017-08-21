import React from 'react';
import { Panel } from 'react-bootstrap';

const CanteenPanel = ({ header, children }) => (
  <Panel
    collapsible
    header={header}
    bsStyle="info"
  >
    {children}
  </Panel>
);

export default CanteenPanel;
