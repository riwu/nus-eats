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

const [post, destroy] = ['POST', 'DELETE'].map((method) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  return (path, payload, headers) => {
    return fetch(`${baseUrl}${path}`, {
      method,
      headers: makeHeaders(headers),
      body: JSON.stringify(payload),
    }).then(processResponse);
  };
});

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
  createMeeting: ({ canteenId, startTime, endTime }) => {
    const formatTime = time => time.format('YYYY-MM-DD HH:mm:ssZ').slice(0, -2);
    return post('/appointments', {
      appointment: {
        canteenId,
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
      },
    });
  },
  cancelMeeting: id => destroy(`/appointments/${id}`),
  joinMeeting: id => post(`/appointments/${id}/join`),
  unjoinMeeting: id => post(`/appointments/${id}/unjoin`),
};
