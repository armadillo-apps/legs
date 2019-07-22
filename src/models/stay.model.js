const mongoose = require("mongoose");

const staySchema = mongoose.Schema({
  apartmentId: { type: String, required: true },
  occupantId: { type: String, required: true },
  checkInDate: { type: Date },
  checkOutDate: { type: Date },
  leaseId: { type: String }
});

const StayModel = mongoose.model("Stay", staySchema);

module.exports = StayModel;
