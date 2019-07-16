const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

describe("occupant", () => {
  let connection;
  let db;

  let mockOccupants = [
    { name: "Tom", employeeId: "1234567a", remarks: "might extend stay" },
    { name: "Tim", employeeId: "1234567b" }
  ];

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
    });

    it("POST should create a new occupant", async () => {
        const response = await request(app).post("/occupants").send(mockOccupants[1]);
        const mockDb = db.collection("occupants");
        const foundOccupant = await mockDb.findOne({employeeId: "1234567b"})
        expect(response.status).toEqual(200);
        expect(foundOccupant.name).toEqual("Tim");
        expect(response.text).toEqual('Successfully added new occupant: "Tim"');
    });
  });
});
