const { Router } = require('express');
const { body } = require('express-validator');

const { validFields } = require('../middlewares/validFields');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
  body('email', 'El correo es obligatorio').isEmail(),
  body('password', 'La contraseña es obligatoria').not().isEmpty(),
  validFields
], login);

router.post('/google', [
  body('id_token', 'El id_token es requerido').not().isEmpty(),
  validFields
], googleSignIn);

module.exports = router;