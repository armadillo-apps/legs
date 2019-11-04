const app = require("../src/app");
const request = require("supertest");
const { mockOccupants } = require("./mockData/mockData");

describe("occupant", () => {
  let db;

  beforeEach(() => {
    db = global.db;
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
      expect(response.body[0].gender).toEqual("male");
      expect(response.body[0].homeOffice).toEqual("Bangkok, Thailand");
      expect(response.body[0].status).toEqual("unallocated");
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

    it("POST should be able to create a new occupant without the optional fields", async () => {
      const response = await request(app)
        .post("/occupants")
        .send(mockOccupants[2]);

      const mockDb = db.collection("occupants");
      const foundOccupant = await mockDb.findOne({ name: "John" });
      expect(response.status).toEqual(201);
      expect(foundOccupant.name).toEqual("John");
      expect(foundOccupant.employeeId).toBe(undefined);
      expect(foundOccupant.homeOffice).toBe(undefined);
      expect(foundOccupant.gender).toBe(undefined);
      expect(foundOccupant.status).toBe("inactive");
      expect(response.text).toEqual("Successfully added new occupant: John");
    });

    it("PUT / should update occupant", async () => {
      const occupants = db.collection("occupants");
      await occupants.insertOne(mockOccupants[0]);

      const requestBody = {
        name: "Aria",
        employeeId: "56789a",
        gender: "Female",
        remarks: "wants to stay indefinitely",
        homeOffice: "Singapore, Singapore",
        status: "allocated"
      };

      const response = await request(app)
        .put("/occupants/5d2ef34111ead80017be83df")
        .send(requestBody)
        .set("Content-Type", "application/json");

      const updatedOccupant = await db
        .collection("occupants")
        .findOne({ name: "Aria" });

      expect(response.status).toBe(201);
      expect(updatedOccupant).toMatchObject(requestBody);
    });
  });
});
