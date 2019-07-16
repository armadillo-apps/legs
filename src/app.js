require("./utils/db");
require("dotenv").config();

const express = require("express");
const app = express();
const OccupantRouter = require("./routes/occupant.route");
const aptRouter = require("./routes/apts");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/occupant", OccupantRouter);
app.use("/apts", aptRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

module.exports = app;
