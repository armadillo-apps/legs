const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/apartments.controller");
const auth = require("../controllers/auth.controller");

router.get("/", auth.authenticate, Ctrl.getApartments);
router.post("/", auth.authenticate, Ctrl.addApartment);
router.put("/:apartmentId", auth.authenticate, Ctrl.updateApartment);

module.exports = router;
