const mongoose = require("mongoose");

const producto = mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String },
  value: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model("Producto", producto);
