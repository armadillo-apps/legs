const express = require("express");
const router = express.Router();

const Ctrl = require("../controllers/users.controller");
const auth = require("../controllers/auth.controller");

router.get("/authenticate", auth.authenticate, Ctrl.getUser);
router.get("/", auth.authorise, Ctrl.getUsers);
router.post("/login", Ctrl.loginUser);
router.post("/logout", Ctrl.logoutUser);
router.post("/new", auth.authorise, Ctrl.addUser);
router.delete("/:userid", auth.authorise, Ctrl.deleteUser);
router.patch("/:userid", auth.authorise, Ctrl.editUserRole);
router.patch("/password/:userid", auth.authenticate, Ctrl.editUserPassword);

module.exports = router;
