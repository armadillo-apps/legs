const ApartmentModel = require("../models/apartment.model");
const OccupantModel = require("../models/occupant.model");
const StayModel = require("../models/stay.model");

const getAllStays = async (req, res, next) => {
  try {
    const stays = await StayModel.find().populate(
      "apartment",
      "name leases",
      ApartmentModel
    );
    res.json(stays);
  } catch (err) {
    next(err);
  }
};

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

    const newStay = req.body;
    newStay.apartment = foundApartment;
    newStay.occupant = foundOccupant;

    await new StayModel(newStay).save();

    return res
      .status(201)
      .send(
        `Successfully assigned ${foundOccupant.name} to ${foundApartment.name}`
      );
  } catch (err) {
    return next(err);
  }
};

const getApartmentProfileHistory = async (req, res, next) => {
  try {
    const { apartmentId } = req.params;
    const matchingStays = await StayModel.find({ apartmentId });
    const matchingStaysWithNames = await Promise.all(
      matchingStays.map(async stay => {
        const occupant = await OccupantModel.findOne({ _id: stay.occupantId });
        const newStay = {
          ...stay._doc,
          occupantName: occupant.name,
          occupantRemarks: occupant.remarks
        };
        return newStay;
      })
    );
    return res.send(matchingStaysWithNames);
  } catch (err) {
    return next(err);
  }
};

const deleteStay = async (req, res, next) => {
  try {
    const deletedStay = await StayModel.findByIdAndDelete(req.params.stayId);
    if (!deletedStay) {
      throw new Error("Stay entry not found");
    }
    return res.status(202).send("Successfully removed stay entry");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getStayList,
  addStay,
  getApartmentProfileHistory,
  deleteStay,
  getAllStays
};
