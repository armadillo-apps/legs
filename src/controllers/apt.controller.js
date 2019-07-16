const mongoose = require("mongoose");
require("../utils/db");
require("../models/apt.model");

const AptModel = mongoose.model("Apt");

const getAptList = async () => {
  return await AptModel.find({});
};

module.exports = { getAptList };
