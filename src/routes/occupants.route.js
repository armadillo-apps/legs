const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/occupants.controller");
const auth = require("../controllers/auth.controller");

router.get("/", auth.authenticationController, Ctrl.getOccupant);
router.post("/", auth.authenticationController, Ctrl.createOccupant);
router.put("/:occupantId", auth.authenticationController, Ctrl.updateOccupant);

module.exports = router;
