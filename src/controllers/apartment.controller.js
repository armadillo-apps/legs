require("../utils/db");
const ApartmentModel = require("../models/apartment.model.js")

const getApartmentList = async () => {
  return await ApartmentModel.find({});
};

const addApartment = async input => {
  const newApartment = new ApartmentModel(input);
  return await newApartment.save();
};

module.exports = { getApartmentList, addApartment };
