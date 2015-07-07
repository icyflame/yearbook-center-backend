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

var userSchema = require('./schema/user.js');
var User = mongoose.model('User', userSchema); // eslint-disable-line

var signUpUser = require('./lib/userActions.js').signUpUser;
var loginUser = require('./lib/userActions.js').loginUser;
var getUserDetails = require('./lib/userActions.js').getUserDetails;

server.post('/user', signUpUser);

server.post('/user/login', loginUser);

server.get('/user/:id', getUserDetails);

server.get('/ping', function (req, res) {
  res.json('Hello! The API is online!');
});

var port = process.env.PORT || 5000;
server.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log('Started listeing on port ' + port);
});
