const mongoose = require("mongoose");

const breadSchema = new mongoose.Schema({
  name: { type: String, required: [true, "The name is required"] },
  type: {
    type: String,
    required: [
      true,
      "The type of bread (Whole Wheat, White, etc.) is mandatory",
    ],
  },
  price: { type: Number, required: [true, "The price is mandatory"] },
  weight: { type: String, required: true },
  ingredients: { type: [String], required: true },
  isVegan: { type: Boolean, default: false },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Bread", breadSchema);
