const app = require("../src/app");
const request = require("supertest");
const { mockApartments } = require("./mockData/mockData");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

describe("apartment CRUD tests", () => {
  let db;

  beforeEach(() => {
    db = global.db;
    jwt.verify.mockReturnValueOnce({});
  });

  describe("routes/apts", () => {
    it("should return list of apartments", async () => {
      const apartmentDbInstance = db.collection("apartments");
      await apartmentDbInstance.insertMany(mockApartments);

      const response = await request(app)
        .get("/apartments")
        .set("Cookie", "token=valid-token");

      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toEqual(2);
      expect(jwt.verify).toHaveBeenCalledTimes(1);
    });

    it("should add a new apartment", async () => {
      const newApartment = mockApartments[0];
      const response = await request(app)
        .post("/apartments")
        .send(newApartment)
        .set("Cookie", "token=valid-token");

      expect(response.status).toEqual(201);
      expect(response.text).toEqual(
        "Successfully added new apartment: China Square Central 01-01"
      );
      expect(jwt.verify).toHaveBeenCalledTimes(1);
    });

    it("should return error if any number input is < 0", async () => {
      const newApartment = {
        name: "Another Garden Shack",
        address: "1234 Garden Lane",
        bedrooms: -5,
        capacity: 5,
        leases: [
          {
            leaseStart: "2011-01-01",
            leaseEnd: "2012-01-01",
            monthlyRent: 5000
          }
        ],
        landlord: {
          name: "Bobby",
          accountNumber: "123"
        }
      };
      const response = await request(app)
        .post("/apartments")
        .send(newApartment)
        .set("Cookie", "token=valid-token");
      expect(response.status).toEqual(500);
      expect(response.text).toEqual(
        "apartment validation failed: bedrooms: Bedrooms cannot be less than 0"
      );
      expect(jwt.verify).toHaveBeenCalledTimes(1);
    });

    it("PUT / should update apartment", async () => {
      const apartments = db.collection("apartments");
      await apartments.insertOne(mockApartments[0]);

      const requestBody = {
        name: "Avengers HQ",
        address: "Who knows",
        bedrooms: 2,
        capacity: 2,
        country: "Thailand",
        landlord: {
          name: "Someone",
          accountNumber: "246810"
        },
        remarks: "This is great"
      };

      const response = await request(app)
        .put("/apartments/5d303529e51a310017aa063c")
        .send(requestBody)
        .set("Content-Type", "application/json")
        .set("Cookie", "token=valid-token");

      const updatedApartment = await db
        .collection("apartments")
        .findOne({ name: "Avengers HQ" });

      expect(response.status).toBe(201);
      expect(updatedApartment).toMatchObject(requestBody);
      expect(jwt.verify).toHaveBeenCalledTimes(1);
    });
  });
});
