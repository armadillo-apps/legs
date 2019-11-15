const app = require("../src/app");
const request = require("supertest");
const { mockUsers } = require("./mockData/mockData");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User.model");
const auth = require("../src/controllers/auth.controller");

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
      jest.mock("../src/controllers/auth.controller");
      jwt.verify.mockReturnValueOnce({ email: "elson@thoughtworks.com" });
      auth.userRole = jest.fn().mockReturnValueOnce(Promise.resolve("admin"));

      const response = await request(app)
        .get("/users")
        .set("Cookie", "token=valid-token");

      expect(jwt.verify).toHaveBeenCalledTimes(1);
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toEqual(2);
    });

    it("should not return a list of users if the admin is not logged in", async () => {
      const userDbInstance = db.collection("users");
      await userDbInstance.insertMany(mockUsers);

      const response = await request(app).get("/users");

      expect(response.status).toEqual(401);
      expect(jwt.verify).toHaveBeenCalledTimes(1);
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
      // Skipped for now because new user route cannot be protected yet,
      // as cypress tests depends on the route to seed a test user
      it.skip("should not allow non-admins to add a new user to the system", async () => {
        jest.mock("../src/controllers/auth.controller");
        jwt.verify.mockReturnValueOnce({ email: "mabel@thoughtworks.com" });
        auth.userRole = jest
          .fn()
          .mockReturnValueOnce(Promise.resolve("manager"));

        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .post("/users/new")
          .send({ email: "john@thoughtworks.com", password: "pass1234" });

        expect(response.status).toEqual(401);
      });

      it("should allow admins to add a new user to the system", async () => {
        jest.mock("../src/controllers/auth.controller");
        jwt.verify.mockReturnValueOnce({ email: "elson@thoughtworks.com" });
        auth.userRole = jest.fn().mockReturnValueOnce(Promise.resolve("admin"));

        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .post("/users/new")
          .send({
            email: "jesstern@thoughtworks.com",
            password: "pass1234",
            role: "admin"
          });

        expect(response.status).toEqual(200);
      });

      it("should not allow a user to sign up with an existing email", async () => {
        await User.ensureIndexes();
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);
        jest.mock("../src/controllers/auth.controller");
        jwt.verify.mockReturnValueOnce({ email: "elson@thoughtworks.com" });
        auth.userRole = jest.fn().mockReturnValueOnce(Promise.resolve("admin"));

        const response = await request(app)
          .post("/users/new")
          .send({
            email: "elson@thoughtworks.com",
            password: "pass1234",
            role: "manager"
          });

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

    describe("[POST] users/:userid", () => {
      it("should not allow non-admins to edit user roles to the system", async () => {
        jest.mock("../src/controllers/auth.controller");
        jwt.verify.mockReturnValueOnce({ email: "mabel@thoughtworks.com" });
        auth.userRole = jest
          .fn()
          .mockReturnValueOnce(Promise.resolve("manager"));

        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .patch("/users/5dc26ecc4c33e04dc232c845")
          .set("Cookie", "token=valid-token")
          .send({ role: "admin" });

        expect(response.status).toEqual(401);
      });

      it("should allow a logged in admin to edit a user's role by its id", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);
        jest.mock("../src/controllers/auth.controller");
        jwt.verify.mockReturnValueOnce({ email: "elson@thoughtworks.com" });
        auth.userRole = jest.fn().mockReturnValueOnce(Promise.resolve("admin"));

        const response = await request(app)
          .patch("/users/5dc26ecc4c33e04dc232c845")
          .set("Cookie", "token=valid-token")
          .send({ role: "admin" });

        expect(response.status).toEqual(200);
        expect(response.body[1].role).toEqual("admin");
      });

      it("should not allow a logged in admin to edit a user's role when the id is invalid", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);
        jest.mock("../src/controllers/auth.controller");
        jwt.verify.mockReturnValueOnce({ email: "elson@thoughtworks.com" });
        auth.userRole = jest.fn().mockReturnValueOnce(Promise.resolve("admin"));

        const response = await request(app)
          .patch("/users/5dc26ecc4c33e04dc232c84522")
          .set("Cookie", "token=valid-token")
          .send({ role: "admin" });

        expect(response.status).toEqual(500);
      });
    });
    describe("[PATCH] users/password/:userid", () => {
      it("should allow any user to change their own password", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .patch("/users/password/5dc26ecc4c33e04dc232c845")
          .set("Cookie", "token=valid-token")
          .send({ password: "pass4321" });

        expect(response.status).toEqual(200);
        expect(response.body.nModified).toEqual(1);
      });

      it("should not allow a user who is not logged in to change their own password", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .patch("/users/password/5dc26ecc4c33e04dc232c845")
          .send({ password: "pass4321" });

        expect(response.status).toEqual(401);
      });

      it("should not allow an invalid user to change password", async () => {
        const userDbInstance = db.collection("users");
        await userDbInstance.insertMany(mockUsers);

        const response = await request(app)
          .patch("/users/password/5dc26ecc4c33e04dc232c")
          .set("Cookie", "token=valid-token")
          .send({ password: "pass4321" });

        expect(response.status).toEqual(404);
      });
    });
  });
});
