const fs = require('fs');
const path = require('path');

// Ruta a la carpeta 'data'
const dataFolder = path.join(__dirname, 'data');

// Lee los nombres de los archivos en la carpeta
fs.readdir(dataFolder, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta:', err);
    return;
  }

  // Crear el objeto con el formato [1: "archivo1.json", 2: "archivo2.json", ...]
  const result = {};
  files.forEach((file, index) => {
    // Verifica si el archivo tiene extensión .json
    if (path.extname(file) === '.json') {
      result[index + 1] = file;
    }
  });

  // Convertir el objeto a JSON
  const jsonResult = JSON.stringify(result, null, 2);

  // Guardar el JSON resultante en un archivo
  fs.writeFile('output.json', jsonResult, (err) => {
    if (err) {
      console.error('Error al escribir el archivo JSON:', err);
      return;
    }
    console.log('Archivo JSON creado con éxito.');
  });
});
