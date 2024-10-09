import { Elysia, t } from "elysia";

const FileName: Record<string, string> = {
  "1": "xa.s12.00.mhz.1969-12-16HR00_evid00006.json",
  "2": "xa.s12.00.mhz.1970-05-20HR00_evid00026.json",
  "3": "xa.s12.00.mhz.1970-05-23HR00_evid00027.json",
  "4": "xa.s12.00.mhz.1970-07-27HR00_evid00039.json"
}

async function loadJsonFile(fileName: string) {
  const readfile = Bun.file(`data/${fileName}`);
  
  const jsonData = await readfile.json();

  return jsonData; 
}


const app = new Elysia()
.get("/json",() => FileName)
.get("/json/:id", async ({ params: { id }, set }) => {
  const fileName = FileName[id];
  
  if (!fileName) {
    set.status = 400  
    return { error: "ID no válido o archivo no encontrado" };
  }

  return await loadJsonFile(fileName);
})


.get("/", () => "Hello Elysia").listen(8000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
