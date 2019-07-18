require("./utils/db");
require("dotenv").config();

const express = require("express");
const app = express();
const occupantRouter = require("./routes/occupant.route");
const apartmentRouter = require("./routes/apartment.route");
const cors = require("cors");

const corsOptions = {
  origin: [
    "https://test-armadillo-arms.herokuapp.com/",
    "https://armadillo-arms.herokuapp.com/",
    "https://demo-armadillo-arms.herokuapp.com/",
    "https://demo-armadillo-legs.herokuapp.com/",
    "https://test-armadillo-legs.herokuapp.com/",
    "https://armadillo-legs.herokuapp.com/",
    "http://localhost:3000",
    "http://localhost:3005"
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/occupants", occupantRouter);
app.use("/apartments", apartmentRouter);

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  if (!err.message) {
    err.message = "Something unexpected happened.";
  }
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
