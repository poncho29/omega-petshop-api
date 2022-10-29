const { Router } = require('express');
const { body, param } = require('express-validator');

const { existCategoryById } = require('../helpers/dbValidators')
const { validFields, validJwt } = require('../middlewares');

const { getCategories, getCategory, createCategory } = require('../controllers/categories');

const router = Router();

// Obtener todas las categorias -  publico
router.get('/', getCategories);

// Obtener una categoria por id - publico
router.get('/:id', [
  param('id', 'No es un id valido').isMongoId(),
  param('id').custom(existCategoryById),
  validFields
], getCategory);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
  validJwt,
  body('name', 'El nombre es obligatorio').not().isEmpty(),
  validFields
], createCategory);

// Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id', (req, res) => {
  res.json('Put category')
});

// Borrar una categoria - privado - solo el admin
router.delete('/:id', (req, res) => {
  res.json('Delete category')
});

module.exports = router;