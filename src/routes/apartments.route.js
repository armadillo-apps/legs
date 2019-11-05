const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/apartments.controller");
const authController = require("../controllers/auth.controller");

router.get("/", authController, Ctrl.getApartments);
router.post("/", authController, Ctrl.addApartment);
router.put("/:apartmentId", authController, Ctrl.updateApartment);

module.exports = router;
