const app = require("../app");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const request = require("supertest");
const aptTestData = require("./aptData");

describe("apartment CRUD tests", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const mongoURI = global.__MONGO_URI__;
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
      const aptDbInstance = db.collection("apts");
      await aptDbInstance.insertMany(aptTestData);
      const response = await request(app).get("/apts");
      console.log(response.body);
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toEqual(2);
    });
  });
});
