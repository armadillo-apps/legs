const mongoose = require("mongoose");

const aptSchema = new mongoose.Schema({
  buildingName: { type: String, required: true },
  buildingAddress: { type: String, required: true, unique: true },
  numBedrooms: { type: Number },
  capacity: { type: Number, required: true },
  leases: [
    {
      leaseStart: { type: Date, required: true },
      leaseEnd: { type: Date, required: true },
      monthlyRent: { type: Number, required: true }
    }
  ]
});

mongoose.model("Apt", aptSchema);
