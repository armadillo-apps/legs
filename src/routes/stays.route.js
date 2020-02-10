const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/stays.controller");
const auth = require("../controllers/auth.controller");

router.get("/", auth.authenticate, Ctrl.getAllStays);

router.get("/apartments/:apartmentId", auth.authenticate, Ctrl.getStayList);

router.get(
  "/apartmentProfileHistory/:apartmentId",
  auth.authenticate,
  Ctrl.getApartmentProfileHistory
);

router.post("/", auth.authenticate, Ctrl.addStay);

router.delete("/:stayId", auth.authenticate, Ctrl.deleteStay);

module.exports = router;
