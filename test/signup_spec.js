var frisby = require('frisby');
var crypto = require('crypto');

var URL = 'http://localhost:5000';
var PASSWORD_STRING = 'ed0bd2f2f46ca767d72a262d6a489e225bcacdf44502210f34f9182fe663ed94';

// frisby.globalSetup({ // globalSetup is for ALL requests
//   request: {
//     headers: { 'X-Auth-Token': 'fa8426a0-8eaf-4d22-8e13-7c1b16a9370c' }
//   }
// });

frisby.create('create a user')
  .post(URL + '/user', {
    'username': crypto.randomBytes(8).toString('hex'),
    'name': 'Siddharth Kannan',
    'password': PASSWORD_STRING,
    'email': 'siddharth@g.com' + crypto.randomBytes(2).toString('hex'),
    'rollnum': '13TH42312' + crypto.randomBytes(1).toString('hex')
  })
  .expectStatus(201)
  .expectJSONTypes({
      'message': String,
      'num_id': Number
  })
  .afterJSON(function (data) {
    frisby.create('get the created user')
      .get(URL + '/user/' + data.num_id)
      .expectStatus(200)
      .expectJSONTypes({
        'username': String,
        'name': String,
        'rollnum': String,
        'email': String,
        '_id': String,
        'num_id': Number
      })
      .afterJSON(function (data) {
        frisby.create('login the created user')
          .post(URL + '/user/login', {
            'username': data.username,
            'password': PASSWORD_STRING
          })
          .expectStatus(200)
          .expectJSONTypes({
            'token': String
          })
          .afterJSON(function (data) {
            frisby.create('logout the user who is logged in')
              .get(URL + '/user/logout?token=' + data.token)
              .expectStatus(200)
              .expectJSONTypes({
                'message': String
              })
              .expectJSON({
                'message': 'Logged out successfully'
              })
              .toss();
          })
          .toss();
      })
      .toss();
  })
  .toss();
