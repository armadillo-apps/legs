const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  bedrooms: { type: Number },
  capacity: { type: Number, required: true },
  leases: [
    {
      leaseStart: { type: Date, required: true },
      leaseEnd: { type: Date, required: true },
      monthlyRent: { type: Number, required: true }
    }
  ],
  landlord: {
    name: { type: String, required: true },
    accountNumber: { type: String, required: true },
    mobile: { type: String },
    email: { type: String }
  }
});

const ApartmentModel = mongoose.model("apartment", apartmentSchema);

module.exports = ApartmentModel;
