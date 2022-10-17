const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

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
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port,  () => {
      console.log('Servidor corriendo en el puerto ' + this.port);
    });
  }
}

module.exports = Server;