import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const FilterButton = ({ toggleFilter }) => (
  <Button onClick={toggleFilter}>
    <Glyphicon glyph="filter" />
    Filter
  </Button>
);

export default FilterButton;
