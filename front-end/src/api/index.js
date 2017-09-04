import moment from 'moment';

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

const parseResponseBody = (response) => {
  const contentType = response.headers.get('Content-Type');

  if (!contentType) {
    return response.text();
  }

  if (contentType.search(/^application\/json/) !== -1) {
    return response.json();
  }
};

const processResponse = (response) => {
  if (response.ok) {
    return parseResponseBody(response);
  }
  return parseResponseBody(response)
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

const [post, destroy, patch, put] = ['POST', 'DELETE', 'PATCH', 'PUT'].map((method) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  return (path, payload, headers) => fetch(`${baseUrl}${path}`, {
    method,
    headers: makeHeaders(headers),
    body: JSON.stringify(payload),
  }).then(processResponse);
});

const formatTime = time => time.format('YYYY-MM-DD HH:mm:ssZ').slice(0, -3);

const getEndTime = (startTime, duration) => {
  const endTime = moment(startTime);
  endTime.add(duration);
  return formatTime(endTime);
};

export default {
  setStore: (s) => { store = s; },
  getAllCanteens: () => get('/canteens').then(({ canteens }) => canteens),
  getAllStalls: () => get('/stalls').then(({ stalls }) => stalls.reduce((dict, stall) => ({
    ...dict,
    [stall.id]: stall,
  }), {})),
  login: accessToken => post('/authentication/login', { accessToken }),
  getMeetings: () => get('/users/friends/appointments/initiated/combined').then(({ appointments }) => appointments.reduce((obj, appointment) => ({
    ...obj,
    [appointment.id]: appointment,
  }), {})),
  createMeeting: ({ canteenId, startTime, duration }) => post('/appointments', {
    appointment: {
      canteenId,
      startTime: formatTime(startTime),
      endTime: getEndTime(startTime, duration),
    },
  }),
  updateMeeting: (id, { canteenId, startTime, duration }) => patch(`/appointments/${id}`, {
    appointment: {
      canteenId,
      startTime: formatTime(startTime),
      endTime: getEndTime(startTime, duration),
    },
  }),
  cancelMeeting: id => destroy(`/appointments/${id}`),
  joinMeeting: id => post(`/appointments/${id}/join`),
  unjoinMeeting: id => post(`/appointments/${id}/unjoin`),
  updateRating: (id, rating) => put(`/stalls/${id}/ratings`, {
    rating: {
      value: rating,
    },
  }),
};
