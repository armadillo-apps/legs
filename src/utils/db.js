const mongoose = require("mongoose");
const dbURI =
  process.env.MONGODB_URI ||
  global.__MONGO_URI__ ||
  "mongodb://localhost:27017/testDb";
console.log(dbURI);

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

if (process.env.NODE_ENV === "development") {
  db.dropDatabase();
}
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
});
