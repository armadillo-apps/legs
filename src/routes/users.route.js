const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");

router.get("/", authController, Ctrl.getUsers);
router.post("/login", Ctrl.loginUser);
router.post("/new", Ctrl.addUser);

module.exports = router;
