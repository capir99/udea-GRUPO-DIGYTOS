const VentaProducto = require("../models/ventaProductoModel");

//metodo para listar los productos de una venta
exports.getProductosVenta = (req, res) => {
  const filter = { sale: req.params.sale };
  VentaProducto.find(filter)
    .populate("sale")
    .populate("product")
    .then((Results) => {
      if (Results) {
        res.status(200).json(Results);
      } else {
        res.status(404).json("Sin producto asociados a la venta");
      }
    })
    .catch((err) => {
      console.log("error:", err);
    });
};

//metodo para crear un nuevo producto asociado a la venta
exports.addVentaProducto = (req, res) => {
  const ventaProducto = new VentaProducto({
    sale: req.body.sale,
    product: req.body.product,
    value: req.body.value,
    quantitySale: req.body.quantitySale,
  });
  ventaProducto.save().then((created) => {
    res.status(201).json("Producto asociado a la venta exitosamente");
  });
};

//metodo para eliminar un producto asociado a la venta
exports.removeProductoVenta = (req, res) => {
  const filter = { _id: req.params.id };
  VentaProducto.deleteOne(filter).then(() => {
    res.status(201).json("Producto asociado a la venta eliminado satisfactoriamente");
  });
};

