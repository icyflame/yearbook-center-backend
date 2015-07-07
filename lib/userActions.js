/* global User */
var crypto = require('crypto');
var isHexdigest = require('is-hexdigest');

function signUpUser (req, res) {
  var isHexdigest = require('is-hexdigest');
  if (!(req.params.username && req.params.name && req.params.password &&
    req.params.email && req.params.rollnum)) {
    res.send(400, 'Required fields missing.');
  } else if (!isHexdigest(req.params.password)) {
    res.send(400, 'Password is not a valid SHA256 hash');
  } else {
    var newUser = new User(req.params);
    User.count('*', function (err, count) {
      if (err) {
        res.send(503, err);
      }
      newUser.num_id = count + 1;
      newUser.save(function (err) {
        if (err) {
          if (err.name === 'ValidationError') {
            res.send(400, {
              name: err.name,
              errors: err.errors
            });
          }
        } else {
          res.send(201, {
            'message': 'New user created'
          });
        }
      });
    });
  }
}

function loginUser (req, res) {
  if (!(req.params.username && req.params.password)) {
    res.send(400, 'Required fields missing.');
  } else if (!isHexdigest(req.params.password)) {
    res.send(400, 'Password is not a valid SHA256 hash.');
  } else {
    User.findOne({ username: req.params.username }, function (err, user) {
      if (err) {
        res.send(503, err);
      }

      if (!user) {
        res.send(404, {
          'message': 'User does not exist.'
        });
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
}

function getUserDetails (req, res) {
  User.findOne({ num_id: req.params.id }, function (err, user) {
    if (err) {
      res.send(503, err);
    }
    res.json({
      name: user.name,
      username: user.username,
      email: user.email,
      rollnum: user.rollnum
    });
  });
}

exports.signUpUser = signUpUser;
exports.loginUser = loginUser;
exports.getUserDetails = getUserDetails;