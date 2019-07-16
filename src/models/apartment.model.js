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
  ]
});

mongoose.model("Apartment", apartmentSchema);
