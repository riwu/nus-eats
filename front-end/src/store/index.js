import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';
import history from './history';

import { get, set } from './local_storage';
import reducer from '../reducers';
import api from '../api';

const middleware = [thunk, routerMiddleware(history)];
const store = createStore(
  reducer,
  get(),
  applyMiddleware(...middleware),
);

api.setStore(store);

store.subscribe(() => {
  set(store.getState());
});

export default store;
