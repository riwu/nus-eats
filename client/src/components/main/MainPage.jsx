import React from 'react';
import { Route } from 'react-router-dom';
import CanteensContainer from '../canteen/CanteensContainer';
import DetailedStallContainer from '../stall/detailedStall/DetailedStallContainer';
import NavigationBarContainer from './NavigationBarContainer';
import Footer from './Footer';
import './MainPage.css';

const MainPage = ({ match }) => (
  <div className="MainPage">
    <NavigationBarContainer />
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
    <Footer />
  </div>
);

export default MainPage;
