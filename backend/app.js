var express = require("express");
var app = express();
require("dotenv").config();

const usuarioRoutes = require("./routes/usuariosRoutes");
const productoRoutes = require("./routes/productosRoutes");
const ventaRoutes = require("./routes/ventasRoutes");
const ventaProductoRoutes = require("./routes/ventaProductoRoutes");
var cors = require("cors");
require("dotenv").config();

//Conexión base de datos
const mongoose = require("mongoose");
<<<<<<< HEAD
const URI = process.env.MONGODB_CONNECT;

//metodo conexión 1
try {
  mongoose.connect(URI).then(() => {
    console.log("Base de datos conectada!!!");
  });
} catch (error) {
  console.log("El error es: " + error);
}
=======
//const URI = process.env.MONGODB_CONNECT
  
//metodo conexión 1
mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
  console.log("Base de datos conectada!!!");
});
>>>>>>> 616c8517b17235fb92c4c266581a892d86f5999e



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
