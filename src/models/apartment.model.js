const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  bedrooms: { type: Number, min: [0, "Bedrooms cannot be less than 0"] },
  capacity: {
    type: Number,
    min: [0, "Capacity cannot be less than 0"],
    required: true
  },
  leases: [
    {
      leaseStart: { type: Date, required: true },
      leaseEnd: { type: Date, required: true },
      monthlyRent: {
        type: Number,
        min: [0, "Monthly rent cannot be less than 0"],
        required: true
      }
    }
  ],
  landlord: {
    name: { type: String },
    accountNumber: { type: String },
    mobile: { type: String },
    email: { type: String }
  },
  country: { type: String },
  remarks: { type: String }
});

const ApartmentModel = mongoose.model("apartment", apartmentSchema);

module.exports = ApartmentModel;
