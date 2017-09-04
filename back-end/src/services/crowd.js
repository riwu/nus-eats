const request = require('request-promise');

const getCrowdValue = async () => {
  const options = {
    method: 'GET',
    uri: 'http://nusfoodie-camera.simple-url.com/api/crowd',
    qs: {
      token: '12345'
    },
    json: true
  };
  return request(options);
}

module.exports = getCrowdValue;