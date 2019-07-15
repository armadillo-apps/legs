require("./db");
require("dotenv").config();

const express = require("express");
const app = express();
const OccupantRouter = require("./src/routes/occupant.route");
const aptRouter = require("./src/routes/apts");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/occupant", OccupantRouter);
app.use("/apts", aptRouter);

app.use((err, req, res, next) => {
  if (!err.message) {
    return res.send("Error: something unexpected happened");
  }
  return res.send(err.message);
});

module.exports = app;
