const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  cedula: {
    type: String,
  },
  phone: {
    type: String,
  },
  img: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    required: true
  },
  google: {
    type: Boolean,
    default: false
  },
  state: {
    type: Boolean,
    default: true
  }
});

module.exports = model('User', UserSchema);