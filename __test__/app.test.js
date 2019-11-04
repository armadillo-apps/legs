const app = require("../src/app");
const request = require("supertest");

describe('Test app', () => {
  it('should return hello', async () => {
    const response = await request(app).get("/");

      expect(response.status).toEqual(200);
  });
});