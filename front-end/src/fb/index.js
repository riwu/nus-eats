let store;

const setStore = (s) => {
  store = s;
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

export default { setStore, api };
