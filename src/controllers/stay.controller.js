require("../utils/db");
const StayModel = require("../models/stay.model");
const ApartmentModel = require("../models/apartment.model");
const OccupantModel = require("../models/occupant.model");

const getStayList = async (req, res, next) => {
  try {
    const foundStay = await StayModel.find({
      apartmentId: req.params.apartmentId
    });
    res.status(200).send(foundStay);
  } catch (err) {
    next(err);
  }
};

const addStay = async (req, res, next) => {
  try {
    const foundApartment = await ApartmentModel.findById(req.body.apartmentId);
    if (!foundApartment) throw new Error("Apartment not found");

    const foundOccupant = await OccupantModel.findById(req.body.occupantId);
    if (!foundOccupant) throw new Error("Occupant not found");
    await new StayModel(req.body).save();
    return res
      .status(201)
      .send(
        `Successfully assigned ${foundOccupant.name} to ${foundApartment.name}`
      );
  } catch (err) {
    return next(err);
  }
};

module.exports = { getStayList, addStay };
