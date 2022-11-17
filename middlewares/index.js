const validJwt = require('../middlewares/validJwt');
const validFields = require('../middlewares/validFields');
const validRoles = require('../middlewares/validRoles');
const validFileUpload = require('../middlewares/validFile');

module.exports = {
  ...validJwt,
  ...validRoles,
  ...validFields,
  ...validFileUpload
}