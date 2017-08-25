import React from 'react';
import { Provider } from 'react-redux';
import MainApp from './containers/App';
import { getAllCanteens, getAllStalls } from './actions';
import store from './store';

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
