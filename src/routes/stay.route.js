const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/stay.controller");

router.get("/", Ctrl.getOccupantProfileHistory);

router.get("/apartments/:apartmentId", Ctrl.getStayList);

router.get(
  "/apartmentProfileHistory/:apartmentId",
  Ctrl.getApartmentProfileHistory
);

router.post("/", Ctrl.addStay);

router.delete("/:stayId", Ctrl.deleteStay);

module.exports = router;
