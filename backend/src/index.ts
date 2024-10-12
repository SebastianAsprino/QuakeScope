import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

import * as fs from 'fs/promises';

const FileName: Record<string, string> = {
  "2": "xa.s12.00.mhz.1969-12-16HR00_evid00006.json",
  "3": "xa.s12.00.mhz.1970-01-09HR00_evid00007.json",
  "4": "xa.s12.00.mhz.1970-02-07HR00_evid00014.json",
  "5": "xa.s12.00.mhz.1970-02-18HR00_evid00016.json",
  "6": "xa.s12.00.mhz.1970-03-14HR00_evid00018.json",
  "7": "xa.s12.00.mhz.1970-03-30HR00_evid00020.json",
  "8": "xa.s16.00.mhz.1973-12-18HR00_evid00487.json",
  "9": "xa.s16.00.mhz.1974-05-19HR00_evid00146.json",
  "10": "xa.s16.00.mhz.1974-11-11HR00_evid00160.json",
  "11": "xa.s16.00.mhz.1974-11-14HR00_evid00587.json",
  "12": "xa.s16.00.mhz.1974-12-12HR02_evid00168.json",
  "13": "xa.s16.00.mhz.1974-12-15HR00_evid00172.json",
  "14": "xa.s16.00.mhz.1974-12-25HR00_evid00174.json",
  "15": "xa.s16.00.mhz.1975-02-19HR00_evid00180.json",
  "16": "xa.s16.00.mhz.1975-03-26HR00_evid00186.json",
  "17": "xa.s16.00.mhz.1977-04-17HR00_evid00249.json",
  "18": "xa.s16.00.mhz.1977-06-02HR00_evid00255.json",
  "19": "xa.s15.00.mhz.1974-11-21HR00_evid00166.json",
  "20": "xa.s15.00.mhz.1974-12-15HR00_evid00169.json",
  "21": "xa.s15.00.mhz.1974-12-15HR00_evid00170.json",
  "22": "xa.s15.00.mhz.1975-04-12HR00_evid00190.json",
  "23": "xa.s15.00.mhz.1975-05-20HR00_evid00653.json",
  "24": "xa.s15.00.mhz.1975-06-22HR00_evid00194.json",
  "25": "xa.s16.00.mhz.1972-09-10HR00_evid00075.json",
  "26": "xa.s16.00.mhz.1972-11-06HR00_evid00079.json",
  "27": "xa.s16.00.mhz.1972-11-08HR00_evid00080.json",
  "28": "xa.s16.00.mhz.1972-11-14HR00_evid00081.json",
  "29": "xa.s16.00.mhz.1973-07-31HR00_evid00123.json",
  "30": "xa.s12.00.mhz.1977-04-26HR00_evid00924.json",
  "31": "xa.s12.00.mhz.1977-07-19HR00_evid00991.json",
  "32": "xa.s12.00.mhz.1977-09-13HR00_evid01012.json",
  "33": "xa.s15.00.mhz.1973-04-04HR00_evid00098.json",
  "34": "xa.s15.00.mhz.1973-08-10HR00_evid00126.json",
  "35": "xa.s15.00.mhz.1973-10-27HR00_evid00134.json",
  "36": "xa.s15.00.mhz.1974-02-06HR00_evid00497.json",
  "37": "xa.s15.00.mhz.1974-06-16HR00_evid00536.json",
  "38": "xa.s15.00.mhz.1974-06-30HR00_evid00542.json",
  "39": "xa.s15.00.mhz.1974-08-04HR00_evid00557.json",
  "40": "xa.s15.00.mhz.1974-10-19HR00_evid00157.json",
  "41": "xa.s12.00.mhz.1974-03-30HR00_evid00512.json",
  "42": "xa.s12.00.mhz.1974-05-09HR00_evid00522.json",
  "43": "xa.s12.00.mhz.1974-06-30HR00_evid00543.json",
  "44": "xa.s12.00.mhz.1974-07-25HR05_evid00553.json",
  "45": "xa.s12.00.mhz.1974-10-02HR00_evid00572.json",
  "46": "xa.s12.00.mhz.1975-04-21HR00_evid00638.json",
  "47": "xa.s12.00.mhz.1975-05-16HR00_evid00651.json",
  "48": "xa.s12.00.mhz.1975-05-20HR00_evid00652.json",
  "49": "xa.s12.00.mhz.1975-06-15HR00_evid00660.json",
  "50": "xa.s12.00.mhz.1975-06-17HR00_evid00662.json",
  "51": "xa.s12.00.mhz.1977-04-11HR00_evid00915.json",
  "52": "xa.s12.00.mhz.1972-11-14HR00_evid00331.json",
  "53": "xa.s12.00.mhz.1972-11-19HR00_evid00335.json",
  "54": "xa.s12.00.mhz.1972-12-02HR00_evid00341.json",
  "55": "xa.s12.00.mhz.1972-12-06HR00_evid00342.json",
  "56": "xa.s12.00.mhz.1972-12-15HR00_evid00349.json",
  "57": "xa.s12.00.mhz.1973-03-12HR00_evid00384.json",
  "58": "xa.s12.00.mhz.1973-04-23HR00_evid00399.json",
  "59": "xa.s12.00.mhz.1973-08-08HR00_evid00437.json",
  "60": "xa.s12.00.mhz.1973-10-03HR03_evid00461.json",
  "61": "xa.s12.00.mhz.1973-10-10HR00_evid00463.json",
  "62": "xa.s12.00.mhz.1973-11-22HR00_evid00475.json",
  "63": "xa.s12.00.mhz.1970-04-03HR00_evid00021.json",
  "64": "xa.s12.00.mhz.1970-07-17HR00_evid00035.json",
  "65": "xa.s12.00.mhz.1971-04-08HR01_evid00083.json",
  "66": "xa.s12.00.mhz.1972-05-19HR00_evid00228.json",
  "67": "xa.s12.00.mhz.1974-03-14HR00_evid00506.json",
  "68": "xa.s12.00.mhz.1977-04-24HR00_evid00923.json",
  "69": "xa.s15.00.mhz.1974-11-17HR00_evid00162.json",
  "70": "xa.s16.00.mhz.1973-08-25HR00_evid00443.json",
  "71": "xa.s12.00.mhz.1971-05-22HR00_evid00092.json",
  "72": "xa.s12.00.mhz.1971-06-11HR00_evid00096.json",
  "73": "xa.s12.00.mhz.1971-06-27HR00_evid00101.json",
  "74": "xa.s12.00.mhz.1971-10-06HR00_evid00124.json",
  "75": "xa.s12.00.mhz.1971-10-06HR00_evid00125.json",
  "76": "xa.s12.00.mhz.1971-10-26HR00_evid00133.json",
  "77": "xa.s12.00.mhz.1971-11-24HR00_evid00156.json",
  "78": "xa.s12.00.mhz.1972-01-26HR00_evid00186.json",
  "79": "xa.s12.00.mhz.1972-02-21HR00_evid00190.json",
  "80": "xa.s12.00.mhz.1972-02-28HR00_evid00192.json",
  "81": "xa.s12.00.mhz.1972-05-15HR00_evid00223.json",
  "82": "xa.s12.00.mhz.1970-07-18HR00_evid00036.json",
  "83": "xa.s12.00.mhz.1970-07-20HR00_evid00037.json",
  "84": "xa.s12.00.mhz.1970-07-27HR00_evid00039.json",
  "85": "xa.s12.00.mhz.1970-09-09HR00_evid00043.json",
  "86": "xa.s12.00.mhz.1970-10-26HR00_evid00049.json",
  "87": "xa.s12.00.mhz.1970-11-03HR00_evid00050.json",
  "88": "xa.s12.00.mhz.1970-11-03HR00_evid00051.json",
  "89": "xa.s12.00.mhz.1971-01-03HR00_evid00057.json",
  "90": "xa.s12.00.mhz.1971-01-05HR00_evid00059.json",
  "91": "xa.s12.00.mhz.1971-01-17HR00_evid00060.json",
  "92": "xa.s12.00.mhz.1971-03-15HR00_evid00073.json",
  "93": "xa.s12.00.mhz.1970-05-20HR00_evid00026.json",
  "94": "xa.s12.00.mhz.1970-05-23HR00_evid00027.json",
  "95": "xa.s12.00.mhz.1970-05-24HR00_evid00028.json",
  "96": "xa.s12.00.mhz.1970-05-25HR00_evid00029.json",
  "97": "xa.s12.00.mhz.1970-06-19HR00_evid00031.json"
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
