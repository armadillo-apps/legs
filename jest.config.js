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
      branches: 80,
      functions: 96.15,
      lines: 92.36,
      statements: 92.42
    }
  }
};
