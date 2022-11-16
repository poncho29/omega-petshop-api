const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      search: '/api/search',
      uploads: '/api/uploads',
      products: '/api/products',
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

    // Carga de archivos
    this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.users, require('../routes/users'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.categories, require('../routes/categories'));
  }

  listen() {
    this.app.listen(this.port,  () => {
      console.log('Servidor corriendo en el puerto ' + this.port);
    });
  }
}

module.exports = Server;