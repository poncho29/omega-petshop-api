const { ObjectId } = require('mongoose').Types;
const { User, Product, Category } = require('../models');

// Colleccion actuales para hacer la busqueda
const alowedCollection = [
  'users',
  'roles',
  'products',
  'categories',
];

// Buscar usuarios
const searchUser = async(word = '', res = response) => {
  const isMongoId = ObjectId.isValid( word );

  if (isMongoId) {
    const user = await User.findById(word);
    return res.json({
      results: (user) ? [user] : []
    });
  }

  // Hace que la palabra de busqueda ignore entre may y min
  const regex = new RegExp(word, 'i');

  const users = await User.find({
    $or: [{name: regex}, {email: regex}],
    $and: [{state: true}]
  });

  res.json({
    results: users
  });
}

// Buscar productos
const searchProduct = async(word = '', res = response) => {
  const isMongoId = ObjectId.isValid( word );

  if (isMongoId) {
    const product = await Product.findById(word)
      .populate('category', nombre);
    return res.json({
      results: (product) ? [product] : []
    });
  }

  // Hace que la palabra de busqueda ignore entre may y min
  const regex = new RegExp(word, 'i');

  const products = await Product.find({ name: regex, state: true })
    .populate('category', 'name');

  res.json({
    results: products
  });
}

// Buscar categorias
const searchCategories = async(word = '', res = response) => {
  const isMongoId = ObjectId.isValid( word );

  if (isMongoId) {
    const category = await Category.findById(word);
    return res.json({
      results: (category) ? [category] : []
    });
  }

  // Hace que la palabra de busqueda ignore entre may y min
  const regex = new RegExp(word, 'i');

  const categories = await Category.find({ name: regex, state: true });

  res.json({
    results: categories
  });
}

const search = (req, res) => {
  const { collection, word } = req.params;

  if(!alowedCollection.includes(collection)) {
    return res.status(400).json({
      msg: `${collection} no es una colleción permitida`
    })
  }

  switch (collection) {
    case 'users':
      searchUser(word, res);
      break;
    case 'products':
      searchProduct(word, res);
      break;
    case 'categories':
      searchCategories(word, res);
      break;
    default:
      res.status(500).json({
        msg: 'Busqueda no implementada'
      });
  }
}

module.exports = {
  search
}