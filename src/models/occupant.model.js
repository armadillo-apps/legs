const mongoose = require("mongoose");

const occupantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String },
  gender: { type: String },
  remarks: { type: String },
  country: { type: String },
  status: { type: String, default: "inactive" }
});

const OccupantModel = mongoose.model("occupant", occupantSchema);

module.exports = OccupantModel;
