const { response } = require("express");

const { uploadFileTool } = require('../helpers');

const uploadFile = async (req, res = response) => {
  // Se valida que vengan lo archivos
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({
      msg: 'Ningun archivo fue cargado.'
    });
    return;
  }

  try {
    // Obtenemos el path del archivo
    const pathFull = await uploadFileTool(req.files, undefined, 'images');

    res.json({
      path: pathFull
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
}

module.exports = {
  uploadFile
}