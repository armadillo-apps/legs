const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/stays.controller");
const authController = require("../controllers/auth.controller");

router.get("/", authController, Ctrl.getAllStays);

router.get("/apartments/:apartmentId", authController, Ctrl.getStayList);

router.get(
  "/apartmentProfileHistory/:apartmentId",
  authController,
  Ctrl.getApartmentProfileHistory
);

router.post("/", authController, Ctrl.addStay);

router.delete("/:stayId", authController, Ctrl.deleteStay);

module.exports = router;
