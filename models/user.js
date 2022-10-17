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

// Aqui se sobreescribe el metodo toJSON para
// sacar los valores que quiera de la respuesta
UserSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = model('User', UserSchema);