import moment from 'moment';
import { LOGOUT } from '../constants/ActionTypes';
import * as time from '../util/time';

let store;

const makeHeaders = (headers = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const accessToken = (store.getState().accessTokens || {}).api;

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

  if (response.status === 401) {
    store.dispatch({
      type: LOGOUT,
    });
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

const postWithFile = (path, payload, headers) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const requestHeaders = makeHeaders(headers);
  const requestBody = Object.entries(payload).reduce((form, [key, value]) => {
    form.append(key, value);
    return form;
  }, new FormData());

  requestHeaders.delete('Content-Type');

  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: requestHeaders,
    body: requestBody,
  }).then(processResponse);
};

const getEndTime = (startTime, duration) => time.format(moment(startTime).add(duration));

export default {
  setStore: (s) => { store = s; },
  getAllCanteens: () => get('/canteens').then(({ canteens }) => canteens.map((obj, canteen) => ({
    ...obj,
    crowdValue: Number(canteen.crowdValue),
  }))),
  getAllStalls: () => get('/stalls').then(({ stalls }) => stalls.reduce((dict, stall) => ({
    ...dict,
    [stall.id]: {
      ...stall,
      averageRating: Number(stall.averageRating),
    },
  }), {})),
  getAllPhotos: stallId => get(`/stalls/${stallId}/photos`)
    .then(({ photos }) => photos.sort((photo1, photo2) => moment(photo1.createdAt) - moment(photo2.createdAt)).reduce((obj, photo) => ({
      ...obj,
      [photo.stallId]: [photo].concat(obj[photo.stallId] || []),
    }), {})),
  uploadFiles: (files, stallId) => Promise.all([...files].map(file => postWithFile('/photos', {
    photo: file,
    stallId,
  }).catch(e => console.log(e)))),
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
  updateMeeting: (id, { canteenId, startTime, duration, title, description }) =>
    patch(`/appointments/${id}`, {
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
  getMeeting: id => get(`/appointments/${id}`).then(({ appointment }) => {
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
