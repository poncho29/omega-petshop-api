const { Router } = require('express');
const { body } = require('express-validator');

const { validFields } = require('../middlewares/validFields');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
  body('email', 'El correo es obligatorio').isEmail(),
  body('password', 'La contraseña es obligatoria').not().isEmpty(),
  validFields
], login);

module.exports = router;