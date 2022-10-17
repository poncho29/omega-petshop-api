const User = require('../models/user');
const Role = require('../models/role');

// Valida si el rol es valido
const roleValid = async(role = '') => {
  const existRole = await Role.findOne({ role });
  if( !existRole ) {
    throw new Error(`El rol ${role} no esta registrado en la base de datos`);
  }
}

// Valida si el email ya existe
const emailValid = async(email = '') => {
  const existEmail = await User.findOne({ email });
  if(existEmail) {
    throw new Error(`El email ${email} ya esta registrado`);
  }
}

module.exports = {
  roleValid,
  emailValid
}