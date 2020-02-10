const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/occupants.controller");
const auth = require("../controllers/auth.controller");

router.get("/", auth.authenticate, Ctrl.getOccupant);
router.post("/", auth.authenticate, Ctrl.createOccupant);
router.put("/:occupantId", auth.authenticate, Ctrl.updateOccupant);

module.exports = router;
