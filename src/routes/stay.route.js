const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/stay.controller");

router.get("/apartments/:apartmentId", Ctrl.getStayList);
router.get("/apartmentProfileHistory/:apartmentId", Ctrl.getApartmentProfileHistory)
router.post("/", Ctrl.addStay);

module.exports = router;
