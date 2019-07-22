const express = require("express");
const router = express.Router();
const { getStayList, addStay } = require("../controllers/stay.controller");
const { getApartmentName } = require("../controllers/apartment.controller");
const { getOccupantName } = require("../controllers/occupant.controller");

router.get("/apartments/:apartmentId", async (req, res, next) => {
    try {
    const foundStay = await getStayList(req.params.apartmentId);
    res.status(200).send(foundStay);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await addStay(req.body);
    const foundApartment = await getApartmentName(req.body.apartmentId);
    const foundOccupant = await getOccupantName(req.body.occupantId);
    return res
      .status(201)
      .send(`Successfully assigned ${foundOccupant} to ${foundApartment}`);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
