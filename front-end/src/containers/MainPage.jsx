import React from 'react';
import CanteensContainer from './CanteensContainer';
import DetailedStallContainer from './DetailedStallContainer';
import FilterButtonContainer from './FilterButtonContainer';
import FilterPanelContainer from './FilterPanelContainer';
import FacebookSDKContainer from './FacebookSDKContainer';
import NavBar from './NavBar';
import MeetingsListContainer from './MeetingsListContainer';

const MainPage = ({ match }) => (
  <div>
    <NavBar />
    <FilterButtonContainer />
    <FilterPanelContainer />
    <CanteensContainer />
    <DetailedStallContainer stallID={match.params.id} />
    <FacebookSDKContainer />
    <MeetingsListContainer />
  </div>
);

export default MainPage;
