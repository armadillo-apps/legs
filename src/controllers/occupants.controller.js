const OccupantModel = require("../models/Occupant.model");

const getOccupant = async (req, res, next) => {
  try {
    const foundOccupant = await OccupantModel.find();
    res.status(200).send(foundOccupant);
  } catch (err) {
    const error = new Error("Unable to get occupant data");
    await res.status(400).json(error.message);
    next();
  }
};

const getOccupantById = async (req, res, next) => {
  try {
    const { occupantId } = req.params;
    const foundOccupant = await OccupantModel.findById(occupantId);
    res.status(200).send(foundOccupant);
  } catch (err) {
    const error = new Error("Unable to get occupant data");
    await res.status(400).json(error.message);
    next();
  }
};

const createOccupant = async (req, res, next) => {
  try {
    const createdOccupant = await new OccupantModel(req.body);
    await createdOccupant.save();
    return res
      .status(201)
      .send(`Successfully added new occupant: ${createdOccupant.name}`);
  } catch (err) {
    const error = new Error("Unable to create new occupant");
    await res.status(400).json(error.message);
    next();
  }
};

const updateOccupant = async (req, res, next) => {
  try {
    const { occupantId } = req.params;
    const { name, employeeId, gender, remarks, homeOffice, status } = req.body;
    const newOccupantDetails = {
      name,
      employeeId,
      gender,
      remarks,
      homeOffice,
      status
    };

    const updatedOccupant = await OccupantModel.findOneAndUpdate(
      { _id: occupantId },
      { $set: newOccupantDetails },
      { new: true }
    );

    return await res
      .status(201)
      .send(`Successfully updated occupant: ${updatedOccupant.name}`);
  } catch (err) {
    const error = new Error("Unable to update occupant");
    await res.status(400).json(error.message);
    next();
  }
};

module.exports = {
  createOccupant,
  getOccupant,
  updateOccupant,
  getOccupantById
};
