const express = require("express");
const router = express.Router();

//Listar ventas
router.get("", function (req, res) {
  res.send("listar ventas");
});

module.exports = router;
