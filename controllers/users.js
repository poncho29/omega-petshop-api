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
  const body = req.body;
  console.log(body);
  const user = new User(body);

  await user.save();

  res.status(201).json({
    msg: 'post API - controller',
    user
  })
}

const usersPut = (req, res) => {
  const {id} = req.params;

  res.status(201).json({
    ok: true,
    id: id,
    msg: 'put API - controller'
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