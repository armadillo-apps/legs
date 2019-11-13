module.exports = {
  preset: "@shelf/jest-mongodb",
  setupFilesAfterEnv: ["./db.setup.js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!**/*.test.js",
    "!src/index.js",
    "!src/server.js",
    "!src/utils/db.js"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
