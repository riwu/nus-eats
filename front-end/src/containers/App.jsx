import React from 'react';
import CanteensContainer from './CanteensContainer';
import DetailedStallContainer from './DetailedStallContainer';
import FilterButtonContainer from './FilterButtonContainer';
import FilterPanelContainer from './FilterPanelContainer';
import FacebookSDKContainer from './FacebookSDKContainer';

const App = () => (
  <div>
    <FilterButtonContainer />
    <FilterPanelContainer />
    <CanteensContainer />
    <DetailedStallContainer />
    <FacebookSDKContainer />
  </div>
);

export default App;
