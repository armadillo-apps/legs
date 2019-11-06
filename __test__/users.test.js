const app = require("../src/app");
const request = require("supertest");
const { mockUsers } = require("./mockData/mockData");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User.model");

jest.mock("jsonwebtoken");

describe("users CRUD tests", () => {
  let db;

  beforeEach(() => {
    db = global.db;
  });

  describe("[GET] users/", () => {
    it("should return a list of users if the admin is logged in", async () => {
      const userDbInstance = db.collection("users");
      await userDbInstance.insertMany(mockUsers);

      const response = await request(app)
        .get("/users")
        .set("Cookie", "token=valid-token");

      expect(response.status).toEqual(200);
      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toEqual(2);
    });

    it("should not return a list of users if the admin is not logged in", async () => {
      const userDbInstance = db.collection("users");
      await userDbInstance.insertMany(mockUsers);

      const response = await request(app).get("/users");

      expect(response.status).toEqual(401);
      expect(jwt.verify).toHaveBeenCalledTimes(0);
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

    describe("[POST] users/logout", () => {
      it("should allow a logged in user to logout", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app).post("/users/logout");

        expect(response.status).toEqual(200);
      });
    });

    describe("[DEL] users/:userid", () => {
      it("should allow a logged in admin to delete a user by its id", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .delete("/users/5dc26ecc4c33e04dc232c256")
          .set("Cookie", "token=valid-token");

        expect(response.status).toEqual(200);
        expect(jwt.verify).toHaveBeenCalledTimes(1);
      });

      it("should not allow an admin who is not logged in delete a user by its id", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app).delete(
          "/users/5dc26ecc4c33e04dc232c256"
        );

        expect(response.status).toEqual(401);
        expect(jwt.verify).toHaveBeenCalledTimes(0);
      });
    });
  });
});
