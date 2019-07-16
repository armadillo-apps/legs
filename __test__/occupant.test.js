const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

describe("occupant", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const mongoURI = global.__MONGO_URI__;
    // console.log("mongoURI", mongoURI);
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true
    });

    const uriArray = mongoURI.split("/");
    const dbName = uriArray[uriArray.length - 1];
    // console.log("dbName", dbName);
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    // await mongoose.disconnect();
    await connection.close();
    await db.close();
  });

  beforeEach(async () => {
    await db.dropDatabase();
  });

  it("GET / should return Hello world", async () => {
    console.log("db", db);
    const response = await request(app).get("/");
    expect(response.text).toEqual("Hello World");
  });

  xit("GET / should return route is working", async () => {
    const response = await request(app).get("/occupant");
    expect(response.body).toEqual("Occupant route is working");
  });
});
