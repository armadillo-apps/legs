const UserModel = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new Error("Login was unsuccessful");
    }
    const token = jwt.sign({ email: user.email }, "secretkey");
    res.cookie("token", token);
    res.send("You are logged in");
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token").send("You are logged out");
};

const addUser = async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    await UserModel.init();
    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      err.statusCode = 400;
    }
    next(err);
  }
};

module.exports = { getUsers, loginUser, logoutUser, addUser };
