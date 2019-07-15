const express = require("express");
const router = express.Router();
const OccupantModel = require("../models/occupant.model");

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send("Occupant route is working");
  } catch (err) {
    next(err);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const foundOccupant = await OccupantModel.find();
    res.status(200).send(foundOccupant);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
