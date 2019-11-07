const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/users.controller");
const authenticationController = require("../controllers/auth.controller");

router.get("/", authenticationController, Ctrl.getUsers);
router.post("/login", Ctrl.loginUser);
router.post("/logout", Ctrl.logoutUser);
router.post("/new", Ctrl.addUser);
router.delete("/:userid", authenticationController, Ctrl.deleteUser);

module.exports = router;
