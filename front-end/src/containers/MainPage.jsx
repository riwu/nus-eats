import React from 'react';
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
    <CanteensContainer />
    <DetailedStallContainer stallId={match.params.id} />
  </div>
);

export default MainPage;
