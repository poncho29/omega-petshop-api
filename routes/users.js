const { Router } = require('express');

const router = Router();

router.get('/', (req,res) => {
  res.json({
    msg: 'get API'
  })
});
router.post('/', (req,res) => {
  res.json({
    msg: 'POST API'
  })
});
router.put('/', (req,res) => {
  res.json({
    msg: 'put API'
  })
});
router.delete('/', (req,res) => {
  res.json({
    msg: 'delete API'
  })
});

module.exports = router;