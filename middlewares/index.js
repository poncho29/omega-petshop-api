const validJwt = require('../middlewares/validJwt');
const validFields = require('../middlewares/validFields');
const validRoles = require('../middlewares/validRoles');

module.exports = {
  ...validJwt,
  ...validRoles,
  ...validFields
}