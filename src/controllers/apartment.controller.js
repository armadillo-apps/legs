const ApartmentModel = require("../models/apartment.model.js");

const getApartmentList = async () => {
  return await ApartmentModel.find({});
};

const addApartment = async input => {
  const newApartment = new ApartmentModel(input);
  return await newApartment.save();
};

const getApartment = async input => {
  return await ApartmentModel.findById(input);
};

module.exports = { getApartmentList, addApartment, getApartment };
