const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories'
    }

    this.connectDB();

    this.middlewares();

    this.routes();
  }

  // Conexion a la base de datos
  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.users, require('../routes/users'));
    this.app.use(this.paths.categories, require('../routes/categories'));
  }

  listen() {
    this.app.listen(this.port,  () => {
      console.log('Servidor corriendo en el puerto ' + this.port);
    });
  }
}

module.exports = Server;