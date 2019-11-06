const app = require("../src/app");
const request = require("supertest");
const { mockUsers } = require("./mockData/mockData");
// const jwt = require("jsonwebtoken");
const User = require("../src/models/User.model");

jest.mock("jsonwebtoken");

describe("users CRUD tests", () => {
  let db;

  beforeEach(() => {
    db = global.db;
  });

  describe("[GET] users/", () => {
    it("should return a list of users", async () => {
      const userDbInstance = db.collection("users");
      await userDbInstance.insertMany(mockUsers);

      const response = await request(app).get("/users");

      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toEqual(2);
    });

    describe("[POST] users/login", () => {
      it("should allow a valid user to log in", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .post("/users/login")
          .send({ email: "elson@thoughtworks.com", password: "pass1234" });

        expect(response.status).toEqual(200);
      });

      it("should not allow an invalid email and password combination to log in", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .post("/users/login")
          .send({ email: "elson@thoughtworks.com", password: "pass12345" });

        expect(response.status).toEqual(400);
      });
    });

    describe("[POST] users/new", () => {
      it("should allow a new user to sign up", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .post("/users/new")
          .send({ email: "jesstern@thoughtworks.com", password: "pass1234" });

        expect(response.status).toEqual(200);
      });

      it("should not allow a user to sign up with an existing email", async () => {
        await User.ensureIndexes();
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .post("/users/new")
          .send({ email: "elson@thoughtworks.com", password: "pass1234" });

        expect(response.status).toBe(400);
      });
    });
  });
});
