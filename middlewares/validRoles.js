const { response } = require("express");

const validRole = (req, res = response, next) => {
  if(!req.user) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token'
    })
  }

  const { role, name } = req.user;
  if(role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} no es Administrador - no pude realizar esta acción`
    })
  }

  next();
}

const validHasRole = (...roles) => {
  return (req, res = response, next) => {
    if(!req.user) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token'
      })
    }

    if(!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `No cuenta con un role autorizado para este servicio`
      })
    }

    next();
  }
}

module.exports = {
  validRole,
  validHasRole
}