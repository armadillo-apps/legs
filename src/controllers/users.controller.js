const UserModel = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUser = async (req, res, next) => {
  try {
    const { email, role } = res.locals.user;
    res.status(200).json({ email, role });
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

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
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token, {
      sameSite: "None",
      secure: process.env.NODE_ENV !== "development"
    });
    res.status(200).json({ email: user.email, role: user.role });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token").send("You are logged out");
};

const addUser = async (req, res) => {
  const { email } = req.body;
  const foundUser = await UserModel.findOne({ email });

  if (foundUser) {
    return res
      .status(202)
      .json({ success: false, message: "Email already exists" });
  }

  try {
    const newUser = new UserModel(req.body);
    await UserModel.init();
    await newUser.save();

    res.status(201).json({
      success: true,
      message: `User ${req.body.email} created successfully`
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong. Please try again."
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await UserModel.findOneAndDelete({ _id: req.params.userid });
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
};

const editUserRole = async (req, res, next) => {
  const userId = req.params.userid;
  const newRole = req.body.role;
  try {
    await UserModel.updateOne(
      { _id: userId },
      { role: newRole },
      { safe: true, multi: true, new: true }
    );
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

const editUserPassword = async (req, res, next) => {
  const userEmail = req.params.userEmail;

  const password = req.body.password;
  const newPassword = req.body.newPassword;

  const rounds = 10;
  const hashedNewPassword = await bcrypt.hash(newPassword, rounds);
  try {
    const user = await UserModel.findOne({ email: userEmail });

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new Error("Incorrect existing password");
    }

    const updatePassword = await UserModel.updateOne(
      { email: userEmail },
      { password: hashedNewPassword },
      { safe: true, multi: true, new: true }
    );
    res.send(updatePassword);
  } catch (error) {
    res.status(404).send({ error: error.toString() });
    next(error);
  }
};

module.exports = {
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  addUser,
  deleteUser,
  editUserRole,
  editUserPassword
};
