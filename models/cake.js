const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
  name: { type: String, required: [true, "The name is required"] },
  flavor: { type: String, required: true },
  price: { type: Number, required: [true, "The price is mandatory"] },
  size: { type: String, required: true },
  servings: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  description: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("Cake", cakeSchema);
