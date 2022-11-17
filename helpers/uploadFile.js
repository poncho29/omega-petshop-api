const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extensions = ['png', 'jpg', 'jpeg', 'gif']; 

const uploadFileTool = (files, validExtensions = extensions, folder = '') => {

  return new Promise((resolve, reject) => {
    const { file } = files;

    // Extraer el nombre del archivo
    const nameSplit = file.name.split('.');
    const extension = nameSplit[nameSplit.length - 1];

    // Validar contra extensiones permitidas
    if (!validExtensions.includes(extension)) {
      return reject(`La extension ${extension} no es permitidas, extensiones validas: ${validExtensions}`);
    }

    // Cambiando nombre por id unico
    const nameTemp = uuidv4() + '.' + extension;

    // Redireccion a la carpeta uploads
    const uploadPath = path.join( __dirname, '../uploads/', folder, nameTemp ); 

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nameTemp);
    });
  });

}

module.exports = {
  uploadFileTool
}