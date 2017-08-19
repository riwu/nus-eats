import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MainApp from './components/App';
import reducer from './reducers';

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
