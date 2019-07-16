const express = require("express");
const router = express.Router();
const OccupantModel = require("../models/occupant.model");
const OccupantController = require("../controllers/occupant.controller");

router.get("/", async (req, res, next) => {
  try {
    const foundOccupant = await OccupantModel.find();
    res.status(200).send(foundOccupant);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  let newOccupant = req.body;
  try {
    const createdOccupant = await OccupantController.createOne(newOccupant);
    return res
      .status(200)
      .send(`Successfully added new occupant: "${createdOccupant.name}"`);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
