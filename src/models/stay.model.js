const mongoose = require("mongoose");

const staySchema = mongoose.Schema({
  apartmentId: { type: String, required: true },
  occupantId: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  leaseId: { type: String }
});

const StayModel = mongoose.model("Stay", staySchema);

module.exports = StayModel;
