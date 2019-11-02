const app = require("../src/app");
const mongoose = require("mongoose");
const request = require("supertest");
const {
  mockApartments,
  mockOccupants,
  mockStays
} = require("./mockData/mockData");

describe("stay READ and CREATE tests", () => {
  let db;

  beforeEach(() => {
    db = global.db;
  });

  it("should render list of stays for a particular apartment", async () => {
    const mockDb = db.collection("stays");
    await mockDb.insertMany(mockStays);

    const response = await request(app).get(
      "/stays/apartments/5d303529e51a310017aa063c"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].occupantId).toBe("5d2ef34111ead80017be83df");
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
    expect(response.status).toBe(201);
    expect(response.text).toBe(
      "Successfully assigned Tom to China Square Central 01-01"
    );
  });

  it("should return status 500 when apartment is not found", async () => {
    const mockApartmentDb = db.collection("apartments");
    await mockApartmentDb.insertMany(mockApartments);

    const mockOccupantDb = db.collection("occupants");
    await mockOccupantDb.insertMany(mockOccupants);

    const response = await request(app)
      .post("/stays")
      .send({
        apartmentId: mongoose.Types.ObjectId("5d303529e51a310017aa063A"),
        occupantId: mongoose.Types.ObjectId("5d2ef34111ead80017be83df"),
        checkInDate: new Date("2020-10-01"),
        checkOutDate: new Date("2021-10-01"),
        leaseId: "e83724nht8"
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Apartment not found");
  });

  it("should return status 500 when occupant is not found", async () => {
    const mockApartmentDb = db.collection("apartments");
    await mockApartmentDb.insertMany(mockApartments);

    const mockOccupantDb = db.collection("occupants");
    await mockOccupantDb.insertMany(mockOccupants);

    const response = await request(app)
      .post("/stays")
      .send({
        apartmentId: mongoose.Types.ObjectId("5d303529e51a310017aa063c"),
        occupantId: mongoose.Types.ObjectId("5d2ef34111ead80017be83dA"),
        checkInDate: new Date("2020-10-01"),
        checkOutDate: new Date("2021-10-01"),
        leaseId: "e83724nht8"
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Occupant not found");
  });

  it("should return all stays with a specified apartmentId", async () => {
    const mockStaysDb = db.collection("stays");
    await mockStaysDb.insertMany(mockStays);
    const mockOccupantDb = db.collection("occupants");
    await mockOccupantDb.insertMany(mockOccupants);

    const response = await request(app).get(
      "/stays/apartmentProfileHistory/12345"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].occupantId).toBe("5d2ef34111ead80017be5432");
    expect(response.body[1].occupantId).toBe("5d2ef34111ead80017be1234");
  });

  it("should return all stays with occupant names", async () => {
    const mockStaysDb = db.collection("stays");
    await mockStaysDb.insertMany(mockStays);
    const mockOccupantDb = db.collection("occupants");
    await mockOccupantDb.insertMany(mockOccupants);

    const response = await request(app).get(
      "/stays/apartmentProfileHistory/12345"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].occupantName).toBe("Tim");
    expect(response.body[0].occupantRemarks).toBe("Has a pet cat");
    expect(response.body[1].occupantName).toBe("John");
    expect(response.body[1].occupantRemarks).toEqual(undefined);
  });

  it("should delete stay based on stayId", async () => {
    const mockStaysDb = db.collection("stays");
    await mockStaysDb.insertMany(mockStays);

    const response = await request(app).delete(
      "/stays/5d2ef34121ead80017be45df"
    );

    expect(response.status).toBe(202);
    expect(response.text).toEqual("Successfully removed stay entry");
    expect(
      mockStaysDb.findOne({ _id: "5d2ef34121ead80017be45df" })
    ).resolves.toBe(null);
  });

  it("should not delete stay when wrong stayId is provided", async () => {
    const mockStaysDb = db.collection("stays");
    await mockStaysDb.insertMany(mockStays);

    const response = await request(app).delete(
      "/stays/5d2ef34131ead80017be47df"
    );
    expect(response.status).toBe(500);
    expect(response.text).toEqual("Stay entry not found");
  });

  describe("get all stays", () => {
    const mockStays = [
      {
        _id: mongoose.Types.ObjectId("5d2ef34121ead80017be45df"),
        apartmentId: "5d303529e51a310017aa063c",
        occupantId: "5d2ef34111ead80017be83df",
        apartment: mongoose.Types.ObjectId("5d303529e51a310017aa063c"),
        checkInDate: new Date("2009-10-10"),
        checkOutDate: new Date("2010-10-10"),
        leaseId: "e83724nht8"
      },
      {
        _id: mongoose.Types.ObjectId("ABCef34121ead80017be45df"),
        apartmentId: "5d303529e51a310017aa0DEF",
        occupantId: "ABCef34111ead80017be83df",
        apartment: mongoose.Types.ObjectId("5d303529e51a310017aa0DEF"),
        checkInDate: new Date("2009-10-10"),
        checkOutDate: new Date("2010-10-10"),
        leaseId: "e83724nht8"
      }
    ];

    const mockApartments = [
      {
        _id: mongoose.Types.ObjectId("5d303529e51a310017aa063c"),
        name: "China Square Central",
        address: "18 Cross Street #11-08",
        bedrooms: 1,
        capacity: 1,
        leases: [
          {
            leaseStart: new Date("2018-01-01"),
            leaseEnd: new Date("2019-01-01"),
            monthlyRent: 5000
          }
        ],
        landlord: {
          name: "Jesstern",
          accountNumber: "123ACF802",
          mobile: 90001000,
          email: "jess@thoughtworks.com"
        }
      },
      {
        _id: mongoose.Types.ObjectId("5d303529e51a310017aa0DEF"),
        name: "Fancy Penthouse",
        address: "18 Cross Street #11-08",
        bedrooms: 1,
        capacity: 1,
        leases: [
          {
            leaseStart: new Date("2020-01-01"),
            leaseEnd: new Date("2021-01-01"),
            monthlyRent: 5000
          }
        ],
        landlord: {
          name: "Jesstern",
          accountNumber: "123ACF802",
          mobile: 90001000,
          email: "jess@thoughtworks.com"
        }
      }
    ];

    beforeEach(async () => {
      await db.collection("stays").insertMany(mockStays);
      await db.collection("apartments").insertMany(mockApartments);
    });

    it("should get all stays with populated apartment details", async () => {
      const res = await request(app).get("/stays");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );

      const stays = res.body;
      expect(stays.length).toEqual(2);
    });

    it("should get occupant's stays with China Square Central as apartment name", async () => {
      const occupantId = "5d2ef34111ead80017be83df";
      const res = await request(app).get(`/stays?occupantId=${occupantId}`);

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );

      const [stay] = res.body;
      expect(res.body.length).toEqual(1);
      expect(stay.apartment.name).toEqual("China Square Central");
      expect(stay.apartment.leases).toEqual([
        {
          leaseStart: "2018-01-01T00:00:00.000Z",
          leaseEnd: "2019-01-01T00:00:00.000Z",
          monthlyRent: 5000
        }
      ]);
    });

    it("should get occupant's stays with Fancy Penthouse as apartment name", async () => {
      const occupantId = "ABCef34111ead80017be83df";
      const res = await request(app).get(`/stays?occupantId=${occupantId}`);

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );

      const [stay] = res.body;
      expect(res.body.length).toEqual(1);
      expect(stay.apartment.name).toEqual("Fancy Penthouse");
      expect(stay.apartment.leases).toEqual([
        {
          leaseStart: "2020-01-01T00:00:00.000Z",
          leaseEnd: "2021-01-01T00:00:00.000Z",
          monthlyRent: 5000
        }
      ]);
    });
  });
});
