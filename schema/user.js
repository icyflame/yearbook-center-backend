var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
  id: {type: Number, required: true},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  rollnum: {type: String, required: true, unique: true}
});

userSchema.plugin(uniqueValidator);

module.exports = userSchema;
