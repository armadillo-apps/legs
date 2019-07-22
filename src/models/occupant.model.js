const mongoose = require("mongoose");

const occupantSchema = mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  remarks: { type: String }
});

const OccupantModel = mongoose.model("occupant", occupantSchema);

module.exports = OccupantModel;
