const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/stays.controller");
const authenticationController = require("../controllers/auth.controller");

router.get("/", authenticationController, Ctrl.getAllStays);

router.get(
  "/apartments/:apartmentId",
  authenticationController,
  Ctrl.getStayList
);

router.get(
  "/apartmentProfileHistory/:apartmentId",
  authenticationController,
  Ctrl.getApartmentProfileHistory
);

router.post("/", authenticationController, Ctrl.addStay);

router.delete("/:stayId", authenticationController, Ctrl.deleteStay);

module.exports = router;
