const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/apartments.controller");
const auth = require("../controllers/auth.controller");

router.get("/", auth.authenticationController, Ctrl.getApartments);
router.post("/", auth.authenticationController, Ctrl.addApartment);
router.put(
  "/:apartmentId",
  auth.authenticationController,
  Ctrl.updateApartment
);

module.exports = router;
