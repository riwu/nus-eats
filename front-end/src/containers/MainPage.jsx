import React from 'react';
import { Route } from 'react-router-dom';
import CanteensContainer from './CanteensContainer';
import DetailedStallContainer from './DetailedStallContainer';
import FilterButtonContainer from './FilterButtonContainer';
import FilterPanelContainer from './FilterPanelContainer';
import NavigationBarContainer from './NavigationBarContainer';

const MainPage = ({ match }) => (
  <div>
    <NavigationBarContainer />
    <FilterButtonContainer />
    <FilterPanelContainer />
    <CanteensContainer selectedCanteenId={match.params.canteenId} />
    <Route
      path={`${match.url}/stall/:stallId`}
      component={DetailedStallContainer}
    />
  </div>
);

export default MainPage;
