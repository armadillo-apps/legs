const express = require("express");
const router = express.Router();

const Ctrl = require("../controllers/stay.controller")

router.get("/apartments/:apartmentId", Ctrl.getStayList);
router.post("/", Ctrl.addStay);

module.exports = router;
