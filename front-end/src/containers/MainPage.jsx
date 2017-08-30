import React from 'react';
import { Route } from 'react-router-dom';
import CanteensContainer from './CanteensContainer';
import DetailedStallContainer from './DetailedStallContainer';
import FilterButtonContainer from './FilterButtonContainer';
import FilterPanelContainer from './FilterPanelContainer';
import NavBar from './NavBar';

const MainPage = ({ match }) => (
  <div>
    <NavBar />
    <FilterButtonContainer />
    <FilterPanelContainer />
    <CanteensContainer canteenId={match.params.canteenId} />
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
