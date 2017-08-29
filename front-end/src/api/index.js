import { appointments } from './appointments.json';
import timeoutPromise from '../util/timeout_promise';

let store;

const makeHeaders = (headers = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const accessToken = store.getState().accessTokens.api;

  if (accessToken) {
    defaultHeaders.Authorization = `Bearer ${accessToken}`;
  }

  return new Headers({
    ...defaultHeaders,
    ...headers,
  });
};

const processResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return response
      .json()
      .then(body => Promise.reject({
        body,
        status: response.status,
      }));
};

const get = (path, headers) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  return fetch(`${baseUrl}${path}`, {
    headers: makeHeaders(headers),
  }).then(processResponse);
};

const post = (path, payload, headers) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: makeHeaders(headers),
    body: JSON.stringify(payload),
  }).then(processResponse);
};

export default {
  setStore: (s) => { store = s; },
  getAllCanteens: () => get('/canteens').then(({ canteens }) => canteens),
  getAllStalls: () => get('/stalls').then(({ stalls }) => stalls.reduce((dict, stall) => ({
    ...dict,
    [stall.id]: stall,
  }), {})),
  login: accessToken => post('/authentication/login', { accessToken }),
  getMeetings: () => timeoutPromise(100).then(() => appointments.reduce((dict, appointment) => ({
    ...dict,
    [appointment.id]: appointment,
  }), {})),
};
