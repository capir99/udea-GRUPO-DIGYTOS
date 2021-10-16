const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventaController");

//**************END POINTS*********************************************
//Listar ventas
router.get("/list", ventaController.getVentas);
//Crear venta
router.post("/add", ventaController.addVenta);
//Eliminar venta
router.delete("/remove/:id", ventaController.removeVenta);
//Actualizar venta
router.post("/modify/:id", ventaController.modifyVenta);
//Consultar venta por codigo
router.get("/search/:code", ventaController.getVentaByCode);
//Consultar venta por Id
router.get("/:id", ventaController.getVentaById);

module.exports = router;
