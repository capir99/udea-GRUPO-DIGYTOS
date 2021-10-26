var express = require("express");
var app = express();
const usuarioRoutes = require("./routes/usuariosRoutes");
const productoRoutes = require("./routes/productosRoutes");
const ventaRoutes = require("./routes/ventasRoutes");
const ventaProductoRoutes = require("./routes/ventaProductoRoutes");
var cors = require("cors");
require("dotenv").config();

//Conexión base de datos
const mongoose = require("mongoose");
const URI = process.env.MONGODB_CONNECT;

//metodo conexión 1
try {
  mongoose.connect(URI).then(() => {
    console.log("Base de datos conectada!!!");
  });
} catch (error) {
  console.log("El error es: " + error);
}

//metodo conexión 2
// const connectDB = async () => {
//   await mongoose.connect(URI, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });
//   console.log("Base de datos conectada!!!");
// };

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

module.exports = app;

app.use("/api/users", usuarioRoutes);
app.use("/api/products", productoRoutes);
app.use("/api/sales", ventaRoutes);
app.use("/api/saleProduct", ventaProductoRoutes);

module.exports = app;
