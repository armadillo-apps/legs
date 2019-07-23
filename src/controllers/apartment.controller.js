const ApartmentModel = require("../models/apartment.model.js");

const getApartments = async (req, res, next) => {
  try {
    const allApartments = await ApartmentModel.find();
    res.status(200).json(allApartments);
  } catch (err) {
    next(err);
  }
};

const addApartment = async (req, res, next) => {
  try {
    const newApartment = await new ApartmentModel(req.body);
    await newApartment.save();
    res
      .status(201)
      .send(`Successfully added new apartment: ${newApartment.name}`);
  } catch (err) {
    next(err);
  }
};

module.exports = { getApartments, addApartment };
