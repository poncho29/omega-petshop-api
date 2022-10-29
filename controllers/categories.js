const { response } = require('express');
const { Category } = require('../models');

// Obetener categorias - paginado - total - populate
const getCategories = async (req, res = response) => {
  const { limit = 0, offset = 0 } = req.query;
  const query = { state: true };

  // Con promise all hacemos las peticiones a la vez lo
  // hace mas rapida la peticion
  const [ total, categories ] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(Number(offset))
      .limit(Number(limit))
  ]);

  res.status(200).json({
    total,
    categories
  })
}

// Obtener categoria - populate
const getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'name');

  res.status(200).json(category);
}

const createCategory = async (req, res = response) => {
  // Se graba en mayuscula
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if(categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name} ya existe`
    })
  }

  // Generar la data a guardar
  const data = { 
    name, 
    user: req.user._id
  }

  const category = new Category(data);

  // Guardar en base de datos
  await category.save();

  res.status(201).json(category);
}

// Actualizar categoria
const updateCategory = async(req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase(); // para mantener en mayus
  data.user = req.user._id; // user que modifico

  const category = await Category.findByIdAndUpdate(id, data, {new: true});

  res.status(200).json(category);
}

// Eliminar categoria - cambiar estado
const deleteCategory = async(req, res = response) => {
  const { id } = req.params;
  const categoryDelete = await Category.findByIdAndUpdate(id, {state: false}, {new: true});

  res.status(200).json(categoryDelete);
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}