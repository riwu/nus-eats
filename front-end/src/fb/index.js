import { setFbReady } from '../actions';

let store;

const setStore = (s) => {
  store = s;
};

const initialize = () => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: '127260141236030',
      xfbml: false,
      version: 'v2.10',
    });

    store.dispatch(setFbReady());
  };

  ((d, s, id) => {
    const element = d.getElementsByTagName(s)[0];
    const fjs = element;
    let js = element;
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

const extractArguments = ([path, ...args]) => {
  const method = typeof args[0] === 'string' ? args[0] : 'get';
  const params = (typeof args[0] === 'string' ? args[1] : args[0]) || {};
  return [path, method, params];
};

const api = (...args) => {
  const [path, method, params] = extractArguments(args);

  if (store.getState().accessTokens.facebook && !params.access_token) {
    params.access_token = store.getState().accessTokens.facebook;
  }

  return new Promise((resolve) => {
    window.FB.api(path, method, params, resolve);
  });
};

export default { initialize, setStore, api };
