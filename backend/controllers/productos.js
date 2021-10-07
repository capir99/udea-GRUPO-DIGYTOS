const express = require("express");
const router = express.Router();

//Listar productos
router.get("", function (req, res) {
  res.send("listar productos");
});

module.exports = router;
