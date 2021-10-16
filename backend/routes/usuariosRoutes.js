const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middleware/auth");

//**************END POINTS*********************************************
//Listar usuarios
router.get("/list", auth, usuarioController.getUsuarios);
//Crear Usuario
router.post("/add", usuarioController.addUsuario);
//Actualizar Usuario
router.post("/modify/:id", usuarioController.modifyUsuario);
//Consultar Usuario por Login
router.get("/search/:email", usuarioController.getUsuarioByEmail);
//Consultar Usuario por Identificador
router.get("/:id", usuarioController.getUsuarioById);

module.exports = router;
