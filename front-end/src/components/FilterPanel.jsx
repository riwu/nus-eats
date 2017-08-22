import React from 'react';
import { Panel } from 'react-bootstrap';

const FilterPanel = ({ isFilterExpanded }) => (
  <Panel collapsible expanded={isFilterExpanded}>
    Filter
  </Panel>
);

export default FilterPanel;
