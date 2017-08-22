import React from 'react';
import { Panel, Checkbox } from 'react-bootstrap';

const FilterPanel = ({ isFilterExpanded, muslimOnly, toggleMuslimOnly }) => (
  <Panel collapsible expanded={isFilterExpanded}>
    <Checkbox checked={muslimOnly} onClick={toggleMuslimOnly}>Muslim only</Checkbox>
  </Panel>
);

export default FilterPanel;
