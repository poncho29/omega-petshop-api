const { validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);
  // Si existen errores entra
  if(!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next(); // Si no hay errores
}

module.exports = {
  validFields
}