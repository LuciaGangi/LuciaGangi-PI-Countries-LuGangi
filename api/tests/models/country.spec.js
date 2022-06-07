const { Country, conn } = require("../../src/db");
const { expect } = require("chai");

const countryData = {
  id: "testID",
  name: "Argentina",
  flag: "https://argentine-flag-image.com",
  region: "Americas",
  capital: "Buenos Aires",
  subregion: "South America",
  area: "2780400",
  population: "45376763",
};

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No es posible conectarse a la base de datos", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));

    describe("primaryKey", () => {
      it("debe generar un id valido como primary key", async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property("id", country.id);
      });
    });

    describe("name", () => {
      it("debe arrojar un error si el nombre es null", (done) => {
        Country.create({}).catch((err) => {
          expect(err.message).to.be.match(/country.name cannot be null/);
          done();
        });
      });

      it("debe funcionar cuando es un nombre válido", async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property("name", country.name);
      });
    });

    describe("flag", () => {
      it("debe arrojar un error si bandera es null", (done) => {
        Country.create({}).catch((err) => {
          expect(err.message).to.be.match(/country.flag cannot be null/);
          done();
        });
      });

      it("debe funcionar cuando es una bandera valida", async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property("flag", countryData.flag);
      });
    });

    describe("region", () => {
      it("debe arrojar un error si la región es null", (done) => {
        Country.create({}).catch((err) => {
          expect(err.message).to.be.match(/country.region cannot be null/);
          done();
        });
      });

      it("debe funcionar cuando es una región válida", async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property("region", countryData.region);
      });
    });

    describe("capital", () => {
      it("debe arrojar un error si la capital es null", (done) => {
        Country.create({}).catch((err) => {
          expect(err.message).to.be.match(/country.capital cannot be null/);
          done();
        });
      });

      it("debe funcionar cuando es una capital válida", async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property(
          "capital",
          countryData.capital
        );
      });
    });
  });
});
