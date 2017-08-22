import React from 'react';
import CanteensContainer from './CanteensContainer';
import DetailedStallContainer from './DetailedStallContainer';
import FilterContainer from './FilterContainer';

const App = () => (
  <div>
    <FilterContainer />
    <CanteensContainer />
    <DetailedStallContainer />
  </div>
);

export default App;
