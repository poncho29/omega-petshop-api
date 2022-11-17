const validFileUpload = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      msg: 'Ningun archivo fue cargado.'
    });    
  }

  next();
}

module.exports = {
  validFileUpload
}