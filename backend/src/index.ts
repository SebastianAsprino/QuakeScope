import { Elysia } from "elysia";

const FileName: object = {
  "1": "xa.s12.00.mhz.1969-12-16HR00_evid00006.json",
  "2": "xa.s12.00.mhz.1970-05-20HR00_evid00026.json",
  "3": "xa.s12.00.mhz.1970-05-23HR00_evid00027.json",
  "4": "xa.s12.00.mhz.1970-07-27HR00_evid00039.json"
}

const app = new Elysia()
.get("filename",() => FileName)

.get("/", () => "Hello Elysia").listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
