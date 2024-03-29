const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: String, required: true },
    inStock: {type: Boolean, default: true},
    maxquantity: {type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
