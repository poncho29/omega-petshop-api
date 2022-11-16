const { Router } = require('express');
const { body } = require('express-validator');

const { uploadFile } = require('../controllers/uploads');

const { validFields } = require('../middlewares/validFields');

const router = Router();

router.post('/', uploadFile);

module.exports = router;