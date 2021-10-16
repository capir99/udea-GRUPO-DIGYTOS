const mongoose = require("mongoose");

const user = mongoose.Schema({
  login: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  rol: { type: String, required: true, default: "Vendedor" },
  estado: { type: String, required: true, default: "Pendiente" },
});

module.exports = mongoose.model("User", user);
