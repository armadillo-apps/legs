const mongoose = require("mongoose");
require("../utils/db");
require("../models/apartment.model");

const ApartmentModel = mongoose.model("Apartment");

const getApartmentList = async () => {
  return await ApartmentModel.find({});
};

const addApartment = async input => {
  const newApartment = new ApartmentModel(input);
  return await newApartment.save();
};

module.exports = { getApartmentList, addApartment };
