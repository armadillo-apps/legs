const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/apartments.controller");
const authenticationController = require("../controllers/auth.controller");

router.get("/", authenticationController, Ctrl.getApartments);
router.post("/", authenticationController, Ctrl.addApartment);
router.put("/:apartmentId", authenticationController, Ctrl.updateApartment);

module.exports = router;
