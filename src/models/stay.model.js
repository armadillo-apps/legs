const mongoose = require("mongoose");
require("../models/apartment.model");

const staySchema = mongoose.Schema({
  apartmentId: { type: String, required: true },
  occupantId: { type: String, required: true },
  apartment: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment" },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  leaseId: { type: String }
});

const StayModel = mongoose.model("Stay", staySchema);

module.exports = StayModel;
