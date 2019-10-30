const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/users.controller");

router.get("/", Ctrl.getUsers);

module.exports = router;
