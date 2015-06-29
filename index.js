var restify = require('restify');
var mongoose = require('mongoose');
var util = require('util');
var crypto = require('crypto');

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
      res.send(400, 'Required fields missing.');
    } else {
      var newUser = new User(req.params);
      User.count('*', function (err, count) {
        console.log(count);
        newUser.num_id = count + 1;
        newUser.save(function (err) {
          console.log(util.inspect(err));
          if (err) {
            if (err.name === 'ValidationError') {
              res.send(400, {
                name: err.name,
                errors: err.errors
              });
            }
          } else {
            res.send(201, 'New user created');
          }
        });
      });
    }
});

server.post('/user/login', function (req, res) {
  if (!(req.params.username && req.params.password)) {
    res.send(400, 'Required fields missing.');
  } else {
    User.findOne({ username: req.params.username }, function (err, user) {
      if (err) {
        res.send(503, err)
      }

      if (user.password === req.params.password) {

        var temp_token = crypto.randomBytes(20).toString('hex');

        user.session_token = temp_token;

        user.save(function (err) {
          if (err) {
            console.error(err);
            res.send(503, err);
          } else {
            res.send(200, {
              token: temp_token
            });
          }
        });
      } else {
        res.send(401, 'Bad Password');
      }
    });
  }
});

server.get('/user/:id', function (req, res) {
  res.send(200, "Successful");
});

var port = process.env.PORT || 5000;
server.listen(port, function (err) {
  console.log("Started listeing on port " + port);
});
