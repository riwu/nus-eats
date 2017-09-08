require('isomorphic-fetch');
const express = require('express');
const app = express();

const API_BASE_URL = 'https://api.nuseats.club';
const canteensPromise = fetch(API_BASE_URL + '/canteens')
  .then((response) => response.json())
  .then(({canteens}) => canteens)
  .then((canteens) => canteens.reduce((obj, canteen) => {
    obj[canteen.id] = canteen;
    return obj;
  }, {}));

app.get('/meetings/:id', function(req, res) {
  const id = req.params.id;

  const appointmentPromise = fetch(API_BASE_URL + '/appointments/' + id)
    .then((response) => response.json())
    .then(({appointment}) => appointment);

  Promise.all([canteensPromise, appointmentPromise])
    .then(([canteens, appointment]) => {
      appointment.canteen = canteens[appointment.canteenId] || {};

      const template = `
      <!doctype html>
      <html>
      <head>
        <meta property="og:type" content="article">
        <meta property="fb:app_id" content="127260141236030">
        <meta property="og:url" content="https://fb.nuseats.club/meetings/${appointment.id}">
        <meta property="og:title" content="${appointment.title}">
        <meta property="og:description" content="${appointment.description}">
        <meta property="og:image" content="${appointment.canteen.imageUrl}">
      </head>
      <body>
        <p>
          Redirecting you to <a href="https://www.nuseats.club/meetings/${appointment.id}">https://www.nuseats.club/meetings/${appointment.id}</a>
        </p>

        <script>
          window.location.replace('https://www.nuseats.club/meetings/${appointment.id}');
        </script>
      </body>
      </html>
      `;

      res.set('Content-Type', 'text/html');
      res.send(template);
    });
});

app.listen(3001, function () {
  console.log('Running');
});
