const mongoose = require("mongoose");

const ventaProducto = mongoose.Schema({
  sale: { type: mongoose.Schema.Types.ObjectId, ref: "Venta", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  value: { type: Number, required: true },
  quantitySale: { type: Number, required: true },
});

module.exports = mongoose.model("VentaProducto", ventaProducto);
