const mongoose = require("mongoose");
const dbUrl = global.__MONGO_URI__ || "mongodb://localhost:27017/occupant";
console.log(global.__MONGO_URI__);

mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
});
