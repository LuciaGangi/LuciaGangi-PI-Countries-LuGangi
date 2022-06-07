/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const request = require("supertest");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  name: "Argentina",
  id: "ARG",
  flag: "https://argentine-flag-image.com",
  region: "Americas",
  capital: "buenos aires",
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No es posible conectarse a la base de datos:", err);
    })
  );
  beforeEach(() =>
    Country.sync({ force: true }).then(() => Country.create(country))
  );
  describe("GET /countries", () => {
    it("debería obtener 200", () => agent.get("/countries").expect(200));
  });
});

describe("POST /activity", () => {
  it("debería retornar estado 404 y su texto correspondiente si alguno de los parámetros obligatorios no se envía", async () => {
    const res = await request(app).post("/activity");
    expect(res.statusCode).to.equals(404);
    expect(res.text).to.equals("Faltan datos obligatorios");
  });
});

describe("Rutas activities", () => {
  describe("GET /activities", () => {
    it("se espera una respuesta 200", () =>
      agent.get("/activities").expect(200));
  });
});

describe("Obtiene un pais por id", () => {
  describe("GET /countries/:id", () => {
    it("Se espera una respuesta 200 se si pasa un id", () =>
      agent.get("/countries/ARG").expect(200));
  });
});
