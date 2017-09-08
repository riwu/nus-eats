require('isomorphic-fetch');
const express = require('express');
const app = express();

const API_BASE_URL = 'https://api.nuseats.club';
const canteensPromise = fetch(API_BASE_URL + '/canteens')
  .then((response) => response.json())
  .then(({canteens}) => canteens);
  .then((canteens) => canteens.reduce((obj, canteen) => {
    obj[canteen.id] = canteen;
    return obj;
  }, {});

app.get('/meetings/:id', function(req, res) {
  const id = req.params.id;

  const appointmentPromise = fetch(API_BASE_URL + '/appointments/' + id)
    .then((response) => response.json())
    .then(({appointment}) => appointment);

  Promise.all([canteensPromise, appointmentPromise])
});

app.listen(3000, function () {
  console.log('Running');
});
