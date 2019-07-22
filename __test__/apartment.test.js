const app = require("../src/app");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const request = require("supertest");
const { mockApartments } = require("./mockData/mockData");
require("../src/utils/db");

describe("apartment CRUD tests", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const dbParams = global.__MONGO_URI__.split("/");
    const dbName = dbParams[dbParams.length - 1];
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await connection.close();
    await db.close();
  });

  beforeEach(async () => {
    await db.dropDatabase();
  });

  describe("routes/apts", () => {
    it("should return list of apartments", async () => {
      const apartmentDbInstance = db.collection("apartments");
      await apartmentDbInstance.insertMany(mockApartments);

      const response = await request(app).get("/apartments");

      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toEqual(2);
    });

    it("should add a new apartment", async () => {
      const newApartment = mockApartments[0];
      const response = await request(app)
        .post("/apartments")
        .send(newApartment);

      expect(response.status).toEqual(201);
      expect(response.text).toEqual(
        "Successfully added new apartment: China Square Central 01-01"
      );
    });
  });
});
