const FB = require('fb');
const request = require('request-promise');
const Boom = require('boom');

const fb = new FB.Facebook({
  version: 'v2.10',
  appId: process.env.FB_APP_ID,
  appSecret: process.env.FB_APP_SECRET
});

let getFacebookData = async (apiCall, accessToken) => {
  let dataList = [];
  let next = null;

  let response = await fb.api(apiCall, { access_token: accessToken });

  if (!response) {
    throw Boom.badGateway('No response from FB');
  }

  if (response.error) {
    throw Boom.badGateway(response.error);
  }

  if (response.data) {
    dataList = dataList.concat(response.data);
  }

  if (response.paging && response.paging.next) {
    next = response.paging.next;
  }

  while (next) {
    const options = {
      method: 'GET',
      uri: next,
      json: true
    };

    response = await request(options);

    if (!response) {
      throw Boom.badGateway('No response from FB');
    }

    if (response.error) {
      throw Boom.badGateway(response.error);
    }

    if (response.data) {
      dataList = dataList.concat(response.data);
    }

    if (response.paging && response.paging.next) {
      next = response.paging.next;
    } else {
      next = null;
    }
  }

  return dataList;
}

module.exports = { fb, getFacebookData };
