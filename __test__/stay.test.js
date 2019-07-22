const app = require("../src/app");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const request = require("supertest");
const { mockApartments, mockOccupants, mockStays } = require('./mockData/mockData')

describe("stay READ and CREATE tests", () => {
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

  it("should render list of stays for a particular apartment", async () => {
    const mockDb = db.collection("stays");
    await mockDb.insertMany(mockStays);

    const response = await request(app).get(
      "/stays/apartments/5d303529e51a310017aa063c"
    );

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].occupantId).toEqual("5d2ef34111ead80017be83df");
  });

  it("should add an occupant's stay to an apartment", async () => {
    const mockApartmentDb = db.collection("apartments");
    await mockApartmentDb.insertMany(mockApartments);

    const mockOccupantDb = db.collection("occupants");
    await mockOccupantDb.insertMany(mockOccupants);

    const response = await request(app)
      .post("/stays")
      .send({
        apartmentId: mongoose.Types.ObjectId("5d303529e51a310017aa063c"),
        occupantId: mongoose.Types.ObjectId("5d2ef34111ead80017be83df"),
        checkInDate: new Date("2020-10-01"),
        checkOutDate: new Date("2021-10-01"),
        leaseId: "e83724nht8"
      });
    expect(response.status).toEqual(201);
    expect(response.text).toEqual(
      "Successfully assigned Tom to China Square Central 01-01"
    );
  });
});
