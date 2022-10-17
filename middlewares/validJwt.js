const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validJwt = async(req, res = response, next) => {
  const token = req.header('x-token');

  if(!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    });
  }

  try {
    const { uid } =  jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    
    const user = await User.findById(uid);

    if(!user) {
      return res.status(401).json({
        msg: 'Token no válido - user no existe en base de datos'
      });
    }

    // Verificar si el uid tiene estado en true
    if(!user.state) {
      return res.status(401).json({
        msg: 'Token no válido - user con state false'
      });
    }

    req.user = user;
    next()
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Token no válido'
    });
  }
}

module.exports ={
  validJwt
}