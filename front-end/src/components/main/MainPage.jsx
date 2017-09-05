import React from 'react';
import { Route } from 'react-router-dom';
import CanteensContainer from '../canteen/CanteensContainer';
import DetailedStallContainer from '../stall/DetailedStallContainer';
import FilterButtonContainer from '../filter/FilterButtonContainer';
import FilterPanelContainer from '../filter/FilterPanelContainer';
import NavigationBarContainer from './NavigationBarContainer';

const MainPage = ({ match }) => (
  <div>
    <NavigationBarContainer />
    <FilterButtonContainer />
    <FilterPanelContainer />
    <CanteensContainer selectedCanteenId={match.params.canteenId} />
    <Route
      path={`${match.url}/stall/:stallId`}
      render={props => (
        <DetailedStallContainer
          canteenPath={match.url}
          stallId={props.match.params.stallId}
        />
      )}
    />
  </div>
);

export default MainPage;
