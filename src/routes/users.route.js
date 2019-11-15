const express = require("express");
const router = express.Router();
const Ctrl = require("../controllers/users.controller");
const auth = require("../controllers/auth.controller");

router.get("/", auth.authenticationController, Ctrl.getUsers);
router.post("/login", Ctrl.loginUser);
router.post("/logout", Ctrl.logoutUser);
router.post("/new", auth.authorisationController, Ctrl.addUser);
router.delete("/:userid", auth.authenticationController, Ctrl.deleteUser);
router.patch("/:userid", auth.authorisationController, Ctrl.editUserRole);
router.patch(
  "/password/:userid",
  auth.authenticationController,
  Ctrl.editUserPassword
);

module.exports = router;
