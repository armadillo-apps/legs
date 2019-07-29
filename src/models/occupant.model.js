const mongoose = require("mongoose");

const occupantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, unique: true , sparse: true},
  remarks: { type: String },
  country: { type: String },
  status: { type: String, required: true }
});

const OccupantModel = mongoose.model("occupant", occupantSchema);

module.exports = OccupantModel;
