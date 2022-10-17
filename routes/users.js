const { Router } = require('express');
const { body } = require('express-validator');

const { validFields } = require('../middlewares/validFields');
const { roleValid, emailValid } = require('../helpers/dbValidators');

const { usersGet, 
        usersPost,
        usersPut,
        usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);
router.post('/', [
        body('name', 'El nombre  es requerido').not().isEmpty(),
        body('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
        body('email', 'El correo no es valido').isEmail(),
        body('email').custom(emailValid),
        body('role').custom(roleValid),
        validFields
],usersPost);
router.put('/:id', usersPut);
router.delete('/:id', usersDelete);

module.exports = router;