const bcryptjs = require('bcryptjs');
const { findByIdAndUpdate } = require('../models/user');
const User = require('../models/user');

const usersGet = (req, res) => {
  const {q, name = 'No name', apiKey} = req.query;

  res.json({
    msg: 'get API  - controller',
    q,
    name,
    apiKey
  })
}

const usersPost = async (req, res) => {
  const { password, ...rest } = req.body
  console.log({...rest})
  const user = new User({ ...rest });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    msg: 'post API - controller',
    user
  })
}

const usersPut = async(req, res) => {
  const { id } = req.params;
  // Se excluyen los campos para que no se actualicen
  const { password, google, email, ...rest } = req.body;

  if(password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(201).json({
    msg: 'put API - controller',
    id,
    user
  })
}

const usersDelete = (req, res) => {
  const {id} = req.params;

  res.status(201).json({
    ok: true,
    msg: 'delete API - controller'
  })
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete
}