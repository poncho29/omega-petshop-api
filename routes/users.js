const { Router } = require('express');
const { body, param } = require('express-validator');

const { validJwt, validFields, validRole  } = require('../middlewares');
const { roleValid, emailValid, existUserById } = require('../helpers/dbValidators');

const { userGet,
        usersGet, 
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
], usersPost);

router.get('/:id', [
        param('id', 'No es un ID valido').isMongoId(),
        param('id').custom(existUserById),
        validFields
], userGet);
        
router.put('/:id', [
        param('id', 'No es un ID valido').isMongoId(),
        param('id').custom(existUserById),
        body('role').custom(roleValid),
        validFields
], usersPut);

router.delete('/:id', [
        validJwt,
        validRole, // Fuerza a que sea admin
        // validHasRole('ADMIN_ROLE', 'USER_ROLE'), // Permite más de un role
        param('id', 'No es un ID valido').isMongoId(),
        param('id').custom(existUserById),
        validFields
], usersDelete);

module.exports = router;