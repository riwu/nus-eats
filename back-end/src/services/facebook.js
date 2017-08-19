const FB = require('fb');

const fb = new FB.Facebook({
  version: 'v2.10',
  appId: process.env.FB_APP_ID,
  appSecret: process.env.FB_APP_SECRET
});

module.exports = fb;
