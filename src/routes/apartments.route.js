const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/apartments.controller");

router.get("/", Ctrl.getApartments);
router.post("/", Ctrl.addApartment);
router.put("/:apartmentId", Ctrl.updateApartment);

module.exports = router;
