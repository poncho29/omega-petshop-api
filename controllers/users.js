const usersGet = (req, res) => {
  const {q, name = 'No name', apiKey} = req.query;

  res.json({
    msg: 'get API  - controller',
    q,
    name,
    apiKey
  })
}

const usersPost = (req, res) => {
  const {name, age} = req.body;

  res.status(201).json({
    msg: 'post API - controller',
    name,
    age
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