const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/stays.controller");
const auth = require("../controllers/auth.controller");

router.get("/", auth.authenticationController, Ctrl.getAllStays);

router.get(
  "/apartments/:apartmentId",
  auth.authenticationController,
  Ctrl.getStayList
);

router.get(
  "/apartmentProfileHistory/:apartmentId",
  auth.authenticationController,
  Ctrl.getApartmentProfileHistory
);

router.post("/", auth.authenticationController, Ctrl.addStay);

router.delete("/:stayId", auth.authenticationController, Ctrl.deleteStay);

module.exports = router;
