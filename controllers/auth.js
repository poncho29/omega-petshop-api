const { response, json } =  require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJwt');
const { googleVerify } = require('../helpers/googleVerify');

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

const googleSignIn = async(req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    // Si no existe se crea el usuarioß
    if(!user) {
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true
      };

      user = new User(data);
      await user.save();
    }

    // Si el usuario el state es false (Eliminado)
    if(!user.state) {
      return res.status(401).json({
        msg: 'Hable con el administradaor, usuario bloqeuado'
      })
    }

    // Generar el jsonwebtoken
    console.log(user.id)
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar'
    })
  }
}

module.exports = {
  login,
  googleSignIn
}