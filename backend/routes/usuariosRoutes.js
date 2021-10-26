const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middleware/auth");

//**************END POINTS*********************************************
//Listar usuarios
router.get("/list", usuarioController.getUsuarios);
//Listar usuarios con rol Vendedor
router.get("/sellerList", usuarioController.getUsuariosVendedores);
//Crear Usuario
router.post("/add", usuarioController.addUsuario);
//Eliminar usuario
router.delete("/remove/:id", usuarioController.removeUsuario);
//Actualizar Usuario
router.post("/modify/:id", usuarioController.modifyUsuario);
//Consultar Usuario por Login
router.get("/search/:email", usuarioController.getUsuarioByEmail);
//Consultar Usuario por Identificador
router.get("/:id", usuarioController.getUsuarioById);

module.exports = router;
