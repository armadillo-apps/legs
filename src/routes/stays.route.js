const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/stays.controller");

router.get("/", Ctrl.getAllStays);

router.get("/apartments/:apartmentId", Ctrl.getStayList);

router.get(
  "/apartmentProfileHistory/:apartmentId",
  Ctrl.getApartmentProfileHistory
);

router.post("/", Ctrl.addStay);

router.delete("/:stayId", Ctrl.deleteStay);

module.exports = router;
