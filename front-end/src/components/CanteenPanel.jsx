import React from 'react';
import { Panel } from 'react-bootstrap';

const CanteenPanel = ({ header, children }) => (
  <Panel
    collapsible
    defaultExpanded
    header={header}
    bsStyle="info"
  >
    {children}
  </Panel>
);

export default CanteenPanel;
