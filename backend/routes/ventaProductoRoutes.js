const express = require("express");
const router = express.Router();
const ventaProductoController = require("../controllers/ventaProductoController");

//**************END POINTS*********************************************

//Crear un producto asociado a la venta
router.post("/add", ventaProductoController.addVentaProducto);
//Listar productos de una venta en particular
router.get("/list/:sale", ventaProductoController.getProductosVenta);
//Eliminar productos de una venta en particular
router.delete("/remove/:id", ventaProductoController.removeProductoVenta);

module.exports = router;
