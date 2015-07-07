var restify = require('restify');
var mongoose = require('mongoose');
// var util = require('util');

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
// server.use(restify.authorizationParser());
// server.use(restify.CORS());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
// server.use(restify.requestExpiry());
// server.use(restify.throttle({
//   burst: 100,
//   rate: 50,
//   ip: true,
//   overrides: {
//     '192.168.1.1': {
//       rate: 0,        // unlimited
//       burst: 0
//     }
//   }
// }));
// server.use(restify.conditionalRequest());

mongoose.connect(process.env.MONGOLAB_DB_URL);

var userActions = require('./lib/userActions.js');

server.get('/users', userActions.getAllUsers);

server.post('/user', userActions.signUpUser);

server.post('/user/login', userActions.loginUser);

server.get('/user/logout', userActions.logoutUser);

server.get('/user/:id', userActions.getUserDetails);

server.get('/ping', function (req, res) {
  res.json({
    'message': 'Hello! The API is online!'
  });
});

var port = process.env.PORT || 5000;
server.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log('Started listeing on port ' + port);
});
