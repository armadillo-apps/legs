const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "manager"] }
});

userSchema.pre("save", async function(next) {
  const rounds = 10;
  this.password = await bcrypt.hash(this.password, rounds);
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
