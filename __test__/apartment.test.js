const app = require("../src/app");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const request = require("supertest");
const apartmentTestData = require("./apartment.data");

xdescribe("apartment CRUD tests", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const mongoURI = process.env.MONGODB_URI || global.__MONGO_URI__;
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true
    });
    const uriArray = mongoURI.split("/");
    const dbName = uriArray[uriArray.length - 1];
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await connection.close();
  });

  beforeEach(async () => {
    await db.dropDatabase();
  });

  describe("routes/apts", () => {
    it("should return list of apartments", async () => {
      const apartmentDbInstance = db.collection("apartments");
      await apartmentDbInstance.insertMany(apartmentTestData);


      const response = await request(app)
        .get("/apartments");

      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toEqual(2);
    });

    it("should add a new apartment", async () => {
      const newApartment = apartmentTestData[0];
      const response = await request(app)
        .post("/apartments")
        .send(newApartment);

      const apartmentDbInstance = db.collection("apartments");

      expect(response.status).toEqual(201);

    });
  });
});
