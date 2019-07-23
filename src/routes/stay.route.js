const express = require("express");
const router = express.Router();
const { getStayList, addStay } = require("../controllers/stay.controller");
const { getApartment } = require("../controllers/apartment.controller");
const { getOccupant } = require("../controllers/occupant.controller");

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
    const foundApartment = await getApartment(req.body.apartmentId);
    if (!foundApartment) {
      throw new Error("Apartment not found");
    }
    const foundOccupant = await getOccupant(req.body.occupantId);
    if (!foundOccupant) {
      throw new Error("Occupant not found");
    }
    await addStay(req.body);
    return res
      .status(201)
      .send(
        `Successfully assigned ${foundOccupant.name} to ${foundApartment.name}`
      );
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
