const mongoose = require("mongoose");
const dbURI =
  process.env.MONGODB_URI ||
  global.__MONGO_URI__;
console.log(dbURI);

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
});
