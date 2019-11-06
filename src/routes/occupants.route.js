const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/occupants.controller");
const authController = require("../controllers/auth.controller");

router.get("/", authController, Ctrl.getOccupant);
router.post("/", authController, Ctrl.createOccupant);
router.put("/:occupantId", authController, Ctrl.updateOccupant);

module.exports = router;
