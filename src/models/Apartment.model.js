const mongoose = require("mongoose");
require("./Stay.model");

const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  bedrooms: { type: Number, min: [0, "Bedrooms cannot be less than 0"] },
  capacity: {
    type: Number,
    min: [0, "Capacity cannot be less than 0"],
    required: true
  },
  status: { type: String, default: "active" },
  leases: [
    {
      leaseStart: { type: Date, required: true },
      leaseEnd: { type: Date, required: true },
      monthlyRent: {
        type: Number,
        min: [0, "Monthly rent cannot be less than 0"],
        required: true
      },
      currency: { type: String, required: true }
    }
  ],
  landlord: {
    name: { type: String, required: true },
    accountNumber: { type: String, required: true }
  },
  country: { type: String },
  remarks: { type: String },
  stays: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stay" }]
});

const ApartmentModel = mongoose.model("Apartment", apartmentSchema);

module.exports = ApartmentModel;
