let store;

const makeHeaders = (headers = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };

  const accessToken = store.getState().accessTokens.api;

  if (accessToken) {
    defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  return new Headers({
    ...defaultHeaders,
    ...headers
  });
};

const get = (path, headers) => {
  // TODO Make sure fetch is available
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  return fetch(`${baseUrl}${path}`, {
    headers: makeHeaders(headers)
  }).then((resp) => resp.json());
};

const post = (path, payload, headers) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: makeHeaders(headers),
    body: JSON.stringify(payload)
  }).then((resp) => resp.json());
};

window.get = get;

export default {
  setStore: (s) => store = s,
  getAllCanteens: () => get('/canteens').then(({canteens}) => canteens),
  getAllStalls: () => get('/stalls').then(({stalls}) => stalls),
  login: (accessToken) => post('/authentication/login', {accessToken})
};
