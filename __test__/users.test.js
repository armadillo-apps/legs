const app = require("../src/app");
const request = require("supertest");
const { mockUsers } = require("./mockData/mockData");

describe("users CRUD tests", () => {

  describe("routes/users", () => {
    it("should return list of users", async () => {
      const userDbInstance = db.collection("users");
      await userDbInstance.insertMany(mockUsers);

      const response = await request(app).get("/users");

      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
      expect(response.body.length).toEqual(2);
    });

    it("should allow a valid user to log in", async () => {
      const userDbInstance = db.collection("users");
      await userDbInstance.insertMany(mockUsers);

      const response = await request(app)
        .post("/users/login")
        .send({ email: "elson@thoughtworks.com", password: "pass1234" });

      expect(response.status).toEqual(200);
    });
  });
});
