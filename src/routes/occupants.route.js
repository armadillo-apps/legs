const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/occupants.controller");

router.get("/", Ctrl.getOccupant);
router.post("/", Ctrl.createOccupant);
router.put("/:occupantId", Ctrl.updateOccupant)

module.exports = router;
