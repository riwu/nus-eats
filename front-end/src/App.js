import React from 'react';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import history from './store/history';

import { getAllCanteens, getAllStalls, getRatings } from './actions';
import store from './store';

import FeedContainer from './components/main/FeedContainer';
import MainPage from './components/main/MainPage';
import PrivacyPolicy from './components/misc/PrivacyPolicy';
import TermsOfService from './components/misc/TermsOfService';

import * as GA from './google/analytics';
import FB from './fb';

import './App.css';

store.dispatch(getAllCanteens);
store.dispatch(getAllStalls);
if (store.getState().accessTokens.api) store.dispatch(getRatings);

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          <FeedContainer />

          <div className="content">
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/canteen/:canteenId" component={MainPage} />
              <Route path="/privacy_policy" component={PrivacyPolicy} />
              <Route path="/terms_of_service" component={TermsOfService} />
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

FB.initialize();
GA.initialize(process.env.REACT_APP_GA_TRACKING_CODE);

export default App;
