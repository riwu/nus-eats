import React from 'react';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import history from './store/history';

import { getAllCanteens, getAllStalls } from './actions';
import store from './store';

import FacebookSDK from './containers/FacebookSDKContainer';
import MainPage from './containers/MainPage';
import Feed from './containers/Feed';

store.dispatch(getAllCanteens());
store.dispatch(getAllStalls());

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route path="/feed" component={Feed} />
          <Route path="/stall/:id" component={MainPage} />
          <FacebookSDK />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
