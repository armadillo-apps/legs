const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model.js");

const authenticationController = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("You are not authorized!");
    }
    req.user = jwt.verify(req.cookies.token, "secretkey");
    next();
  } catch (err) {
    res.status(401).end("You are not authorized!");
  }
};

const userRole = async email => {
  const user = await UserModel.findOne({ email });
  return user.role;
};

const authorisationController = async (req, res, next) => {
  try {
    console.log(req.cookies.token);
    const allowedRoles = "admin";
    req.user = jwt.verify(req.cookies.token, "secretkey");
    const email = req.user.email;
    const role = await userRole(email);
    if (role !== allowedRoles) {
      throw new Error("You are not authorized!");
    }
    next();
  } catch (err) {
    res.status(401).end("You are not authorized!");
  }
};

module.exports = {
  authenticationController,
  authorisationController,
  userRole
};
