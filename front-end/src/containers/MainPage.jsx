import React from 'react';
import CanteensContainer from './CanteensContainer';
import DetailedStallContainer from './DetailedStallContainer';
import FilterButtonContainer from './FilterButtonContainer';
import FilterPanelContainer from './FilterPanelContainer';
import FacebookSDKContainer from './FacebookSDKContainer';
import NavBar from './NavBar';

const MainPage = ({ match }) => (
  <div>
    <NavBar />
    <FilterButtonContainer />
    <FilterPanelContainer />
    <CanteensContainer />
    <DetailedStallContainer stallID={match.params.id} />
    <FacebookSDKContainer />
  </div>
);

export default MainPage;
