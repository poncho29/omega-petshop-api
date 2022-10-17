const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async (req, res) => {
  const { id } = req.query;

  const user = await User.findOne(id);

  res.json({
    user
  })
}

const usersGet = async (req, res) => {
  const { limit = 0, offset = 0 } = req.query;
  const query = { state: true };

  // Con promise all hacemos las peticiones a la vez lo
  // hace mas rapida la peticion
  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(offset))
      .limit(Number(limit))
  ]);

  res.json({
    total,
    users
  })
}

const usersPost = async (req, res) => {
  const { password, ...rest } = req.body

  const user = new User({ ...rest });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    msg: 'User created successfully',
    user
  })
}

const usersPut = async (req, res) => {
  const { id } = req.params;
  // Se excluyen los campos para que no se actualicen
  const { _id, password, google, ...rest } = req.body;

  if(password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(201).json({
    msg: 'User update successful',
    user
  })
}

const usersDelete = async (req, res) => {
  const {id} = req.params;

  // Borrarlo de la base de datos (No recomendado)
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, {state: false});

  res.status(201).json({
    msg: 'User deleted successfully',
    user
  })
}

module.exports = {
  userGet,
  usersGet,
  usersPost,
  usersPut,
  usersDelete
}