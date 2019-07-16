const mongoose = require("mongoose");
const OccupantModel = require("../models/occupant.model");

module.exports.createOne = async person => {
  const Occupant = new OccupantModel(person);
  return await Occupant.save();
};
