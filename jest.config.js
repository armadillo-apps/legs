module.exports = {
  preset: "@shelf/jest-mongodb",
  setupFilesAfterEnv: ["./db.setup.js"],
  collectCoverageFrom: ["src/**/*.js", "!**/*.test.js", "!src/index.js"],
  coverageThreshold: {
    global: {
      branches: 63,
      functions: 88,
      lines: 89,
      statements: 89
    }
  }
};
