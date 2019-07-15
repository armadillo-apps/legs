const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true
};

const dbUrl = global.__MONGO_URI__ || "mongodb://localhost:27017/test";

mongoose.connect(dbUrl, mongoOptions); //establishing connection between server and db
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
});
