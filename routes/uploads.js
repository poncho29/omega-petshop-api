const { Router } = require('express');
const { param } = require('express-validator');

const { validCollections } = require('../helpers');
const { validFields, validFileUpload } = require('../middlewares');
const { uploadFile, updateFileCloudinary, showFile } = require('../controllers/uploads');


const router = Router();

router.post('/', validFileUpload, uploadFile);

router.put('/:collection/:id', [
  validFileUpload, // Valida si no viene un archivo
  param('id', 'El id no es valido').isMongoId(),
  param('collection').custom(c => validCollections(c, ['users', 'products'])),
  validFields
], updateFileCloudinary);

router.get('/:collection/:id', [
  param('id', 'El id no es valido').isMongoId(),
  param('collection').custom(c => validCollections(c, ['users', 'products'])),
  validFields
], showFile);

module.exports = router;