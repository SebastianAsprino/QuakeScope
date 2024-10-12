const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, 'event_data.csv');
const jsonDataPath = path.join(__dirname, 'data');

const dataMap = {};

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const filename = row.Filename;
    const sismoStart = parseFloat(row.start);
    const sismoEnd = parseFloat(row.end);

    if (!dataMap[filename]) {
      dataMap[filename] = {
        sismo_start: [],
        sismo_end: []
      };
    }

    dataMap[filename].sismo_start.push(sismoStart);
    dataMap[filename].sismo_end.push(sismoEnd);
  })
  .on('end', () => {
    fs.readdir(jsonDataPath, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        if (path.extname(file) === '.json') {
          const filePath = path.join(jsonDataPath, file);
          const filename = path.basename(file, '.json');

          if (dataMap[filename]) {
            fs.readFile(filePath, 'utf8', (err, jsonData) => {
              if (err) throw err;

              const jsonContent = JSON.parse(jsonData);

              jsonContent.sismo_start = dataMap[filename].sismo_start;
              jsonContent.sismo_end = dataMap[filename].sismo_end;

              fs.writeFile(filePath, JSON.stringify(jsonContent, null, 2), (err) => {
                if (err) throw err;
                console.log(`Actualizado: ${file}`);
              });
            });
          }
        }
      });
    });
  });
