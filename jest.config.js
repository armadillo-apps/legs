module.exports = {
  preset: "@shelf/jest-mongodb",
  setupFilesAfterEnv: ["./db.setup.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!**/*.test.js",
    "!src/server.js",
    "!src/utils/db.js"
  ],
  coverageThreshold: {
    global: {
      branches: 83.33,
      functions: 96.55,
      lines: 92.48,
      statements: 92.52
    }
  }
};
