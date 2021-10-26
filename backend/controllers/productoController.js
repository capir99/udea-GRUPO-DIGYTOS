const Producto = require("../models/productoModel");

//metodo para listar los productos
exports.getProductos = (req, res) => {
  Producto.find()
    .then((postResult) => {
      if (postResult) {
        res.status(200).json(postResult);
      } else {
        res.status(404).json("Sin productos");
      }
    })
    .catch((err) => {
      console.log("error:", err);
    });
};

//metodo para listar los productos en Stock
exports.getProductosStock = (req, res) => {
  const filter = { quantity: { $gt: 0 } };
  Producto.find(filter)
    .then((postResult) => {
      if (postResult) {
        res.status(200).json(postResult);
      } else {
        res.status(404).json("Sin productos");
      }
    })
    .catch((err) => {
      console.log("error:", err);
    });
};

//metodo para crear un nuevo producto
exports.addProducto = (req, res) => {
  const producto = new Producto({
    code: req.body.code,
    name: req.body.name,
    desc: req.body.desc,
    value: req.body.value,
    quantity: req.body.quantity,
  });
  producto.save().then((createdProduct) => {
    res.status(201).json("Producto creado satisfactoriamente");
  });
};

//metodo para eliminar un producto
exports.removeProducto = (req, res) => {
  const filter = { _id: req.params.id };
  Producto.deleteOne(filter).then(() => {
    res.status(201).json("Producto eliminado satisfactoriamente");
  });
};

//metodo para consultar un producto por su ID
exports.getProductoById = (req, res) => {
  Producto.findById(req.params.id).then((productResult) => {
    if (productResult) {
      res.status(200).json(productResult);
    } else {
      res.status(404).json("Producto no encontrado");
    }
  });
};

//metodo para consultar un producto por su codigo
exports.getProductoByCode = (req, res) => {
  const filter = { code: { $regex: "^" + req.params.code, $options: "i" } };

  Producto.find(filter).then((productResult) => {
    if (productResult) {
      res.status(200).json(productResult);
    } else {
      res.status(404).json("Producto no encontrado");
    }
  });
};

//metodo para modificar un producto existente
exports.modifyProducto = (req, res) => {
  const filter = { _id: req.params.id };

  Producto.findOne(filter).then((productResult) => {
    if (productResult) {
      productResult.code = req.body.code;
      productResult.name = req.body.name;
      productResult.desc = req.body.desc;
      productResult.value = req.body.value;
      productResult.quantity = req.body.quantity;
      productResult.save().then(() => {
        res.status(201).json("Producto actualizado satisfactoriamente");
      });
    } else {
      res.status(404).json("Producto no encontrado");
    }
  });
};
