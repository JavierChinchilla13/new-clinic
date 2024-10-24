const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: ["producto", "servicio"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Product", ProductSchema);
