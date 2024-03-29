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

    res.status(200).json({
      accessToken: token,
      user: { email: user.email, role: user.role }
    });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

const logoutUser = async (req, res) => {
  res.send("You are logged out");
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

const deleteUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const userDeleted = await UserModel.findOneAndDelete({ _id: userid });

    const allUsers = await UserModel.find();
    res.status(200).json({
      success: true,
      message: `User ${userDeleted.email} deleted successfully`,
      data: allUsers
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong. Please try again."
    });
  }
};

const editUserRole = async (req, res) => {
  const userId = req.params.userid;
  const newRole = req.body.role;

  try {
    const userEdited = await UserModel.findById({ _id: userId });
    await UserModel.updateOne(
      { _id: userId },
      { role: newRole },
      { safe: true, multi: true, new: true }
    );

    const allUsers = await UserModel.find();
    res.status(200).json({
      success: true,
      message: `User ${userEdited.email} edited successfully`,
      data: allUsers
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong. Please try again."
    });
  }
};

const editUserPassword = async (req, res) => {
  const userEmail = req.params.userEmail;

  const password = req.body.password;
  const newPassword = req.body.newPassword;

  const rounds = 10;
  const hashedNewPassword = await bcrypt.hash(newPassword, rounds);
  try {
    const user = await UserModel.findOne({ email: userEmail });

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res
        .status(202)
        .json({ success: false, message: "Incorrect existing password" });
    }

    await UserModel.updateOne(
      { email: userEmail },
      { password: hashedNewPassword },
      { safe: true, multi: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong. Please try again."
    });
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
