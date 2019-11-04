const ApartmentModel = require("../models/Apartment.model.js");

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

const updateApartment = async (req, res, next) => {
  try {
    const { apartmentId } = req.params;
    const {
      name,
      address,
      bedrooms,
      capacity,
      country,
      landlord,
      remarks
    } = req.body;
    const newApartmentDetails = {
      name,
      address,
      bedrooms,
      capacity,
      country,
      landlord,
      remarks
    };
    const updatedApartment = await ApartmentModel.findOneAndUpdate(
      { _id: apartmentId },
      { $set: newApartmentDetails },
      { new: true }
    );

    return await res
      .status(201)
      .send(`Successfully updated apartment: ${updatedApartment.name}`);
  } catch (err) {
    const error = new Error("Unable to update apartment");
    return await res.status(400).json(error.message);
  }
};

module.exports = { getApartments, addApartment, updateApartment };