const mongoose = require("mongoose");
require("../utils/db");
require("../models/apartment.model");

const ApartmentModel = mongoose.model("Apartment");

const getApartmentList = async () => {
  return await ApartmentModel.find({});
};

module.exports = { getApartmentList };
