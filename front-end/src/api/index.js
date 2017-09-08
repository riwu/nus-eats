import moment from 'moment';
import * as time from '../util/time';

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

const encodeBody = (body, headers) => {
  const contentType = headers.get('Content-Type');

  switch (contentType) {
    case 'application/json':
      return JSON.stringify(body);
    case 'multipart/form-data':
      return Object.entries(body).reduce((form, [key, value]) => {
        form.set(key, value);
        return form;
      }, new FormData());
    default:
      return undefined;
  }
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

  return (path, payload, headers) => {
    const requestHeaders = makeHeaders(headers);
    const requestBody = encodeBody(payload, requestHeaders);

    return fetch(`${baseUrl}${path}`, {
      method,
      headers: requestHeaders,
      body: requestBody,
    }).then(processResponse);
  };
});

const getEndTime = (startTime, duration) => time.format(moment(startTime).add(duration));

export default {
  setStore: (s) => { store = s; },
  getAllCanteens: () => get('/canteens').then(({ canteens }) => canteens),
  getAllStalls: () => get('/stalls').then(({ stalls }) => stalls.reduce((dict, stall) => ({
    ...dict,
    [stall.id]: stall,
  }), {})),
  login: accessToken => post('/authentication/login', { accessToken }),

  getMeetings() {
    return get('/users/friends/appointments/initiated/combined')
      .then(({ appointments }) => appointments.reduce((obj, appointment) => {
        const startTime = time.parse(appointment.startTime);
        const endTime = time.parse(appointment.endTime);
        const duration = moment.duration(endTime.diff(startTime));

        return {
          ...obj,
          [appointment.id]: {
            ...appointment,
            startTime,
            endTime,
            duration,
          },
        };
      }, {}));
  },

  createMeeting: ({ canteenId, startTime, duration, title, description }) => post('/appointments', {
    appointment: {
      canteenId,
      startTime: time.format(startTime),
      endTime: getEndTime(startTime, duration),
      title,
      description,
    },
  }),
  updateMeeting: (id, { canteenId, startTime, duration, title, description }) => patch(`/appointments/${id}`, {
    appointment: {
      canteenId,
      startTime: time.format(startTime),
      endTime: getEndTime(startTime, duration),
      title,
      description,
    },
  }),
  cancelMeeting: id => destroy(`/appointments/${id}`),
  joinMeeting: id => post(`/appointments/${id}/join`),
  unjoinMeeting: id => post(`/appointments/${id}/unjoin`),
  getRatings: () => get('/users/ratings').then(ratings => ratings.ratings),
  updateRating: (id, rating) => put(`/stalls/${id}/ratings`, {
    rating: {
      value: rating,
    },
  }),
  getMeeting: (id) => get(`/appointments/${id}`).then(({appointment}) => {
    const startTime = time.parse(appointment.startTime);
    const endTime = time.parse(appointment.endTime);
    const duration = moment.duration(endTime.diff(startTime));

    return {
      ...appointment,
      startTime,
      endTime,
      duration,
    };
  }),
};
