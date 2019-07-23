const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/occupant.controller");

router.get("/", Ctrl.getOccupant);
router.post("/", Ctrl.createOccupant);

module.exports = router;
