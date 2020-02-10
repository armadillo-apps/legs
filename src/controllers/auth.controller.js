const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model.js");

const userRole = async email => {
  const user = await UserModel.findOne({ email });
  return user.role;
};

const authenticate = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("You are not authorized!");
    }
    req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    if (req.user && Object.keys(req.user).length !== 0) {
      const email = req.user.email;
      const role = await userRole(email);
      res.locals.user = { email, role };
    }
    next();
  } catch (err) {
    res.status(401).end("You are not authorized!");
  }
};

const authorise = async (req, res, next) => {
  try {
    const allowedRoles = "admin";
    req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
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
  userRole,
  authenticate,
  authorise
};
