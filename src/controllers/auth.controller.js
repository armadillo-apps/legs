const jwt = require("jsonwebtoken");

const authenticationController = (req, res, next) => {
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

module.exports = authenticationController;
