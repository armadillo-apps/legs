const mongoose = require("mongoose");

const occupantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String },
  gender: { type: String },
  remarks: { type: String },
  homeOffice: { type: String },
  status: { type: String, default: "inactive" }
});

const OccupantModel = mongoose.model("Occupant", occupantSchema);

module.exports = OccupantModel;
