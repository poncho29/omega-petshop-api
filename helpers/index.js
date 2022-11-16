const dbValidator = require('./dbValidators');
const generateJWT = require('./generateJwt');
const googleVerify = require('./googleVerify');
const uploadFile = require('./uploadFile');

module.exports = {
  ...dbValidator,
  ...generateJWT,
  ...googleVerify,
  ...uploadFile
}
