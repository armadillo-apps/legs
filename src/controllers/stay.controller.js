const mongoose = require("mongoose");
require("../utils/db");
const StayModel = require("../models/stay.model");

const getStayList = async (input) => {
  return await StayModel.find({apartmentId: input});
};

const addStay = async input => {
  const newStay = new StayModel(input);
  return await newStay.save();
};

module.exports = { getStayList, addStay };
