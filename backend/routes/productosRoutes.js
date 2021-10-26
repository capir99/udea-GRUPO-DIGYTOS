const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

//**************END POINTS*********************************************
//Listar productos
router.get("/list", productoController.getProductos);
//Listar productos en stock
router.get("/listStock", productoController.getProductosStock);
//Crear producto
router.post("/add", productoController.addProducto);
//Eliminar producto
router.delete("/remove/:id", productoController.removeProducto);
//Actualizar producto
router.post("/modify/:id", productoController.modifyProducto);
//Consultar producto por codigo
router.get("/search/:code", productoController.getProductoByCode);
//Consultar producto por Id
router.get("/:id", productoController.getProductoById);

module.exports = router;
