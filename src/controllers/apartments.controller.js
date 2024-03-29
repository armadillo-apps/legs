const ApartmentModel = require("../models/Apartment.model");

const getApartments = async (req, res, next) => {
  try {
    const allApartments = await ApartmentModel.find().populate("stays");
    res.status(200).json(allApartments);
  } catch (err) {
    next(err);
  }
};

const getApartmentById = async (req, res) => {
  try {
    const { apartmentId } = req.params;
    const apartmentFound = await ApartmentModel.findById(apartmentId).populate(
      "stays"
    );
    res.status(200).json(apartmentFound);
  } catch (err) {
    const error = new Error("Unable to find apartment");
    await res.status(404).send(error.message);
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
      status,
      leases,
      landlord,
      remarks
    } = req.body;
    const newApartmentDetails = {
      name,
      address,
      bedrooms,
      capacity,
      country,
      status,
      leases,
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
    await res.status(400).send(error.message);
    next();
  }
};

module.exports = {
  getApartments,
  addApartment,
  updateApartment,
  getApartmentById
};
