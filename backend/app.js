var express = require("express");
var app = express();
require("dotenv").config();

const usuarioRoutes = require("./routes/usuariosRoutes");
const productoRoutes = require("./routes/productosRoutes");
const ventaRoutes = require("./routes/ventasRoutes");
var cors = require("cors");

//Conexión base de datos
const mongoose = require("mongoose");
const URI = process.env.MONGODB_CONNECT
  
//metodo conexión 1
mongoose.connect(URI).then(() => {
  console.log("Base de datos conectada!!!");
});

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

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ventas", ventaRoutes);


module.exports = app;
