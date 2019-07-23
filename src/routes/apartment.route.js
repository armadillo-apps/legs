const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/apartment.controller");

router.get("/", Ctrl.getApartments);
router.post("/", Ctrl.addApartment);

module.exports = router;
