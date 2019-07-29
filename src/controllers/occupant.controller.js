const OccupantModel = require("../models/occupant.model");

const getOccupant = async (req, res, next) => {
  try {
    const foundOccupant = await OccupantModel.find();
    res.status(200).send(foundOccupant);
  } catch (err) {
    const error = new Error("Unable to get occupant data");
    return await res.status(400).json(error.message);
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
    return await res.status(400).json(error.message);
  }
};

const updateOccupant = async (req, res, next) => {
  try {
    const { occupantId } = req.params;
    const { name, employeeId, remarks, country, status } = req.body;
    const newOccupantDetails = {
      name,
      employeeId,
      remarks,
      country,
      status
    };

    const occupantToUpdate = await OccupantModel.findOneAndUpdate(
      { _id: occupantId },
      { $set: newOccupantDetails },
      { new: true }
    );

    return await res.status(201).json(occupantToUpdate)
  } catch (err) {
    const error = new Error("Unable to update occupant");
    return await res.status(400).json(error.message);
  }
};

module.exports = { createOccupant, getOccupant, updateOccupant };
