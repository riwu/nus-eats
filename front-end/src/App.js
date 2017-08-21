import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MainApp from './containers/App';
import reducer from './reducers';
import { getAllCanteens, getAllStalls } from './actions';

const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));
store.dispatch(getAllCanteens());
store.dispatch(getAllStalls());

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
