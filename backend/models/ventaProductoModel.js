const mongoose = require("mongoose");

const ventaProducto = mongoose.Schema({
  code: { type: String, required: true },
  docIdent: { type: String, required: true },
  nomClient: { type: String, required: true },
  vendedor: { type: String },
  value: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("VentaProducto", ventaProducto);
