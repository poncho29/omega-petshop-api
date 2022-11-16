const { Product, Category } = require('../models');

const getProducts = async (req, res) => {
  const { limit = 0, offset = 0 } = req.query;
  const query = { state: true };

  const [ total, products ] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(offset))
      .limit(Number(limit))
  ]);

  res.json({
    total,
    products
  })
}

const getProduct = async (req, res) => {
  const { id } = req.params;
  const producto = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

  res.status(200).json(producto);
}

const createProduct = async (req, res) => {
  const { name, state, user, ...product } = req.body;
  const nameProduct = name.toUpperCase(); // se mantienen los nombres en mayuscula

  // Evito que se cree un producto con el mismo nombre
  const productDB = await Product.findOne({name: nameProduct});

  if(productDB) {
    return res.status(400).json({
      msg: `El producto ${name} ya existe`
    });
  }

  const data = {
    ...product,
    name: nameProduct,
    user: req.user.id,
  }

  const newProduct = new Product(data);  
  await newProduct.save();
  
  res.status(201).json(newProduct);
}

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  // Evitamos que envien el usuario modificado
  data.user = req.user._id;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  if (data.category) {
    const category =  await Category.findById(data.category);
    if (!category) {
      return res.status(400).json({
        msg: 'La categoria no existe'
      })
    }
  }

  // new: enviar el nuevo resgistro
  const product = await Product.findByIdAndUpdate(id, data, {new: true});

  res.status(200).json(product);
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productDelete = await Product.findByIdAndDelete(id);
  // const productDelete = await Product.findByIdAndUpdate(id, {state: false}, {new: true});

  res.status(200).json({
    msg: 'Producto eliminado exitosamente',
    id: productDelete._id
  });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}