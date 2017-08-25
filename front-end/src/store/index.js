import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { get, set } from './local_storage';
import reducer from '../reducers';
import api from '../api';

const middleware = [thunk];
const store = createStore(
  reducer,
  get(),
  applyMiddleware(...middleware)
);

api.setStore(store);

store.subscribe(() => {
  set(store.getState());
});

export default store;
