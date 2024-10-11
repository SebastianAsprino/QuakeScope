import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

import * as fs from 'fs/promises';

const FileName: Record<string, string> = {
  "1": "xa.s12.00.mhz.1972-01-26HR00_evid00186.json",
  "2": "xa.s12.00.mhz.1973-11-22HR00_evid00475.json",
  "3": "xa.s12.00.mhz.1969-12-16HR00_evid00006.json",
  "4": "xa.s12.00.mhz.1970-05-20HR00_evid00026.json",
  "5": "xa.s12.00.mhz.1970-05-23HR00_evid00027.json",
  "6": "xa.s12.00.mhz.1970-07-27HR00_evid00039.json",
  "7": "xa.s12.00.mhz.1970-09-09HR00_evid00043.json",
  "8": "xa.s12.00.mhz.1971-01-05HR00_evid00059.json",
  "9": "xa.s12.00.mhz.1971-03-15HR00_evid00073.json",
  "10": "xa.s12.00.mhz.1971-04-08HR01_evid00083.json",
  "11": "xa.s12.00.mhz.1971-06-11HR00_evid00096.json",
  "12": "xa.s12.00.mhz.1971-10-26HR00_evid00133.json",
  "13": "xa.s12.00.mhz.1971-11-24HR00_evid00156.json",
  "14": "xa.s12.00.mhz.1972-02-21HR00_evid00190.json",
  "15": "xa.s12.00.mhz.1972-02-28HR00_evid00192.json",
  "16": "xa.s12.00.mhz.1972-05-15HR00_evid00223.json",
  "17": "xa.s12.00.mhz.1972-05-19HR00_evid00228.json",
  "18": "xa.s12.00.mhz.1972-11-14HR00_evid00331.json",
  "19": "xa.s12.00.mhz.1972-11-19HR00_evid00335.json",
  "20": "xa.s12.00.mhz.1972-12-06HR00_evid00342.json",
  "21": "xa.s12.00.mhz.1973-04-23HR00_evid00399.json",
  "22": "xa.s12.00.mhz.1973-08-08HR00_evid00437.json",
  "23": "xa.s12.00.mhz.1973-10-03HR03_evid00461.json",
  "24": "xa.s12.00.mhz.1973-10-10HR00_evid00463.json",
  "25": "xa.s12.00.mhz.1974-03-30HR00_evid00512.json",
  "26": "xa.s12.00.mhz.1974-07-25HR05_evid00553.json",
  "27": "xa.s12.00.mhz.1974-10-02HR00_evid00572.json",
  "28": "xa.s12.00.mhz.1975-06-15HR00_evid00660.json",
  "29": "xa.s12.00.mhz.1975-06-17HR00_evid00662.json",
  "30": "xa.s12.00.mhz.1977-04-26HR00_evid00924.json",
  "31": "xa.s12.00.mhz.1977-07-19HR00_evid00991.json",
  "32": "xa.s15.00.mhz.1973-04-04HR00_evid00098.json",
  "33": "xa.s15.00.mhz.1974-06-16HR00_evid00536.json",
  "34": "xa.s15.00.mhz.1974-11-21HR00_evid00166.json",
  "35": "xa.s15.00.mhz.1975-04-12HR00_evid00190.json",
  "36": "xa.s16.00.mhz.1972-09-10HR00_evid00075.json",
  "37": "xa.s16.00.mhz.1973-07-31HR00_evid00123.json",
  "38": "xa.s16.00.mhz.1973-12-18HR00_evid00487.json",
  "39": "xa.s16.00.mhz.1974-12-12HR02_evid00168.json",
  "40": "xa.s16.00.mhz.1975-03-26HR00_evid00186.json"
}

async function loadJsonFile(fileName: string) {
  const readfile = Bun.file(`data/${fileName}`);
  
  const jsonData = await readfile.json();

  return jsonData; 
}

async function imageExists(filePath: string) {
  try {
    await fs.access(filePath); // Verifica si el archivo existe
    return true;
  } catch {
    return false;
  }
}

const app = new Elysia()
.use(cors({
  origin: '*', // Permite todas las solicitudes. Puedes cambiar '*' por dominios específicos.
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // Encabezados permitidos
  credentials: true // Permitir envío de cookies en solicitudes CORS
}))
.headers({
  "X-Powered-By": "Elysia",
})

.get("/json",() => FileName)
.get("/json/:id", async ({ params: { id }, set }) => {
  const fileName = FileName[id];
  
  if (!fileName) {
    set.status = 400  
    return { error: "ID no válido o archivo no encontrado" };
  }

  return await loadJsonFile(fileName);
})

.get("/image/:id", async ({ params: { id }, set }) => {
  const jsonFileName = FileName[id];
  
  if (!jsonFileName) {
    set.status = 400;
    return { error: "ID no válido o archivo no encontrado" };
  }

  // Cambia la extensión del archivo a .jpg
  const imageFileName = jsonFileName.replace(".json", ".jpg");
  const imagePath = `data/${imageFileName}`; // Cambia la carpeta según la ubicación de las imágenes

  if (await imageExists(imagePath)) {
    // set.headers["Content-Type"] = "image/jpeg";
    return Bun.file(imagePath);
  } else {
    set.status = 404;
    return { error: "Imagen no encontrada" };
  }
})

.get("/", () => "Hello Elysia")
.listen(8000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
