const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/users.controller");
const auth = require("../controllers/auth.controller");

router.get("/", auth.authenticationController, Ctrl.getUsers);
router.post("/login", Ctrl.loginUser);
router.post("/logout", Ctrl.logoutUser);
router.post("/new", auth.authorisationController, Ctrl.addUser);
router.delete("/:userid", auth.authenticationController, Ctrl.deleteUser);
router.post("/:userid", auth.authorisationController, Ctrl.editUserRole);

module.exports = router;
