const { Router } =  require('express');
const { body, param } = require('express-validator');

const { existProductById, existCategoryById } = require('../helpers/dbValidators')
const { validJwt, validRole, validFields } = require('../middlewares');

const { getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct } = require('../controllers/products');

const router = Router();

// Obtiene todos los productos paginados - Publico
router.get('/', getProducts);

// Obtiene un producto - Publico
router.get('/:id', [
  param('id', 'No es un id valido').isMongoId(),
  param('id').custom(existProductById),
  validFields
], getProduct);

// Crear un producto - Privado - Solo un admin puede crearlo
router.post('/', [
  validJwt,
  validRole, // valida que sea role admin
  body('name', 'El nombre del producto es requerido').not().isEmpty(),
  body('quantity', 'La cantidad del producto es requerida').not().isEmpty(),
  body('category', 'El id de la categoria no es valido').isMongoId(),
  body('category').custom(existCategoryById),
  validFields
], createProduct);

// Actualizar un producto - Privado - Solo un admin puede actualizarlo
router.put('/:id', [
  validJwt,
  validRole, // valida que sea role admin
  param('id', 'El id no es valido').isMongoId(),
  param('id').custom(existProductById),
  validFields
], updateProduct);

// Eliminar un producto - Privado - Solo un admin puede eliminarlo
router.delete('/:id', [
  validJwt,
  validRole, // valida que sea role admin
  param('id', 'El id no es valido').isMongoId(),
  param('id').custom(existProductById),
  validFields
], deleteProduct);

module.exports = router;