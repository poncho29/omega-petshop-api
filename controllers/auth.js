const { response } =  require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({
        msg: 'Usuario / Password incorrectas - email'
      })
    }

    // Verificar si el user esta activo
    if(!user.state) {
      return res.status(400).json({
        msg: 'Usuario no existe - state: false'
      })
    }

    // Verificar contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if(!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password incorrectas - password'
      })
    }

    // Generar JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })
  } catch (error) {
    // Eso no deberia aparece nunca, se pone para evitar caidas del servidor
    console.log(error);
    res.status(500).json({
      msg: 'Ups!, algo salio mal'
    })
  }  
}

module.exports = {
  login
}