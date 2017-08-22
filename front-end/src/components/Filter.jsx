import React from 'react';
import { Button, Glyphicon, Panel } from 'react-bootstrap';

const Filter = ({ isFilterExpanded, toggleFilter }) => (
  <div>
    <Button onClick={toggleFilter}>
      <Glyphicon glyph="filter" />Filter
      </Button>
    <Panel collapsible expanded={isFilterExpanded}>
        Filter
      </Panel>
  </div>
  );

export default Filter;
