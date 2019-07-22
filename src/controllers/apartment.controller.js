require("../utils/db");
const ApartmentModel = require("../models/apartment.model.js")

const getApartmentList = async () => {
  return await ApartmentModel.find({});
};

const addApartment = async input => {
  const newApartment = new ApartmentModel(input);
  return await newApartment.save();
};

const getApartmentName = async input => {
  const foundApartment = await ApartmentModel.findById(input)
  return foundApartment.name;
}

module.exports = { getApartmentList, addApartment, getApartmentName };
