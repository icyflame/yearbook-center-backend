var restify = require('restify');
var mongoose = require('mongoose');

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
var User = mongoose.model('User', userSchema);

server.get('/ping', function (req, res) {
  res.json("Hello! The API is online!");
});

server.post('/user', function (req, res) {

  if (!(req.params.username && req.params.name && req.params.password
    && req.params.email && req.params.rollnum)) {
      res.send(400, 'Some fields are missing.');
    } else {
      var newUser = new User(req.params);
      res.send(201, 'New user created.');
    }
});

server.get('/user/:id', function (req, res) {
  res.send(200, "Successful");
});

var port = process.env.PORT || 5000;
server.listen(port, function (err) {
  console.log("Started listeing on port " + port);
});
