const { User, Role, Category } = require('../models');

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

// Valida si un usuario existe
const existUserById = async(id = '') => {
  const existUser = await User.findById(id);
  if(!existUser) {
    throw new Error(`No existe un usuario con el id ${id} en la base de datos`);
  }
}

// Valida si la categoria de un producto existe
const existCategoryById = async(id = '') => {
  const existCategory = await Category.findById(id);
  if(!existCategory) {
    throw new Error(`No existe una categoria con el id ${id} en la base de datos`);
  }
}

module.exports = {
  roleValid,
  emailValid,
  existUserById,
  existCategoryById
}