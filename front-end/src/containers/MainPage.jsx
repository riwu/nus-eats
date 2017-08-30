import React from 'react';
import CanteensContainer from './CanteensContainer';
import DetailedStallContainer from './DetailedStallContainer';
import FilterButtonContainer from './FilterButtonContainer';
import FilterPanelContainer from './FilterPanelContainer';
import NavigationBar from './NavigationBarContainer';

const MainPage = ({ match }) => (
  <div>
    <NavigationBar />
    <FilterButtonContainer />
    <FilterPanelContainer />
    <CanteensContainer />
    <DetailedStallContainer stallId={match.params.id} />
  </div>
);

export default MainPage;
