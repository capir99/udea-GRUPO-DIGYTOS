const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

//**************END POINTS*********************************************
//Listar usuarios
router.get("/list", usuarioController.getUsuarios);
//Crear Usuario
router.post("/add", usuarioController.addUsuario);
//Actualizar Usuario
router.post("/modify", usuarioController.modifyUsuario);
//Consultar Usuario por Identificador
router.get("/:id", usuarioController.getUsuarioById);

module.exports = router;
