import React from 'react';
import { Panel } from 'react-bootstrap';

const style = {
  cursor: 'pointer',
};

const CanteenPanel = ({ header, children, expanded }) => (
  <Panel
    style={style}
    collapsible
    expanded={expanded}
    header={header}
    bsStyle="info"
  >
    {children}
  </Panel>
);

export default CanteenPanel;
