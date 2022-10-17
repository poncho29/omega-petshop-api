const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async (req, res) => {
  const { limit = 5, offset = 0 } = req.query;
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
    msg: 'successful update',
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