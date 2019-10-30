module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "testDb"
    },
    binary: {
      version: "4.0.3",
      skipMD5: true
    },
    autoStart: false
  }
};
