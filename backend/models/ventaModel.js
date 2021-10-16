const mongoose = require("mongoose");

const venta = mongoose.Schema({
  code: { type: String, required: true },
  docIdent: { type: String, required: true },
  nameClient: { type: String, required: true },
  nameEmploye: { type: String },
  value: { type: Number, required: true },
  quantity: { type: Number },
  date: { type: String },
  estado: { type: String },
});

module.exports = mongoose.model("Venta", venta);
