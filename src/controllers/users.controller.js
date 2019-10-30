const UserModel = require("../models/User.model.js");

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers };
