var frisby = require('frisby');

var URL = 'http://localhost:5000';

// frisby.globalSetup({ // globalSetup is for ALL requests
//   request: {
//     headers: { 'X-Auth-Token': 'fa8426a0-8eaf-4d22-8e13-7c1b16a9370c' }
//   }
// });

frisby.create('create a user')
  .get(URL + '/users')
  .expectStatus(200)
  .expectJSONTypes('*', {
    '_id': String,
    'email': String,
    'name': String,
    'username': String,
    'rollnum': String,
    'num_id': Number
  })
  .toss();
