const app = require("../src/app");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const request = require("supertest");
require("../src/utils/db");
const { mockOccupants } = require("./mockData/mockData");

describe("occupant", () => {
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

  describe("/occupants", () => {
    it("GET / should return list of current occupants", async () => {
      const mockDb = db.collection("occupants");
      await mockDb.insertMany(mockOccupants);
      const response = await request(app).get("/occupants");

      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body[0].name).toEqual("Tom");
      expect(response.body[1].name).toEqual("Tim");
      expect(response.body[0].employeeId).toEqual("1234567a");
      expect(response.body[1].employeeId).toEqual("1234567b");
      expect(response.body[0].remarks).toEqual("might extend stay");
    });

    it("POST should create a new occupant", async () => {
      const response = await request(app)
        .post("/occupants")
        .send(mockOccupants[1]);

      const mockDb = db.collection("occupants");
      const foundOccupant = await mockDb.findOne({ employeeId: "1234567b" });

      expect(response.status).toEqual(201);
      expect(foundOccupant.name).toEqual("Tim");
      expect(response.text).toEqual("Successfully added new occupant: Tim");
    });

    it("POST should create a new occupant without employeeId", async () => {
      const response = await request(app)
        .post("/occupants")
        .send(mockOccupants[2]);

      const mockDb = db.collection("occupants");
      const foundOccupant = await mockDb.findOne({ name: "John" });
      expect(response.status).toEqual(201);
      expect(foundOccupant.name).toEqual("John");
      expect(foundOccupant.employeeId).toBe(undefined);
      expect(response.text).toEqual("Successfully added new occupant: John");
    });

   
  });
});
