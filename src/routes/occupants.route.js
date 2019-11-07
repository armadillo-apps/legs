const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/occupants.controller");
const authenticationController = require("../controllers/auth.controller");

router.get("/", authenticationController, Ctrl.getOccupant);
router.post("/", authenticationController, Ctrl.createOccupant);
router.put("/:occupantId", authenticationController, Ctrl.updateOccupant);

module.exports = router;
