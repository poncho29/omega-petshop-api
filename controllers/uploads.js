const { response } = require("express");
const path = require('path');
const fs = require("fs");

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { User, Product } = require('../models');
const { uploadFileTool } = require('../helpers');

const uploadFile = async (req, res = response) => {
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

// Actualizar file
const updateFile = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }
      break;
  
    default:
      return res.status(500).json({ msg: 'Error al cargar archivo' });
  }

  // Limpiar imagenes previas
  if(model.img) {
    // Se borra la img del server
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    console.log(pathImage)
    if(fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const name = await uploadFileTool(req.files, undefined, collection);
  model.img = name;

  await model.save();
  
  res.json({ model });
}

// Actualizar file en cloudinary
const updateFileCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }
      break;
  
    default:
      return res.status(500).json({ msg: 'Error al cargar archivo' });
  }

  // Limpiar imagenes previas
  if(model.img) {
    // Se borra la img de cloudinary
    const nameArr = model.img.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.img = secure_url;

  await model.save();

  res.json(model);
}


// Mostrar archivo
const showFile = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        });
      }
      break;
  
    default:
      return res.status(500).json({ msg: 'Error al cargar archivo' });
  }

  // Limpiar imagenes previas
  if(model.img) {
    // Se borra la img del server
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if(fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  const pathImgDefault = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImgDefault);
}

module.exports = {
  showFile,
  uploadFile,
  updateFile,
  updateFileCloudinary
}